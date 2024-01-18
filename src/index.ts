import { Client, Collection, IntentsBitField, Partials } from "discord.js";
import { BotCommand, BotClient } from "./types";
import { commandFiles, eventFiles } from "./files";
import keepAlive from "./server";
import addReactionRole from "./reactions";
import dotenv from "dotenv";
dotenv.config();

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, any>;
    }
}

const bot = new Client<true>({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
}) as BotClient;

bot.commands = new Collection<string, any>();

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`) as BotCommand;
    bot.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./src/events/${file.substring(0, file.length - 3)}`);

    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
    }

    bot.on(event.name, (...args) => event.execute(...args, bot));
}

addReactionRole();

bot.login(process.env.DISCORD_TOKEN as string);
keepAlive();
