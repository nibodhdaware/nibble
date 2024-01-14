import "dotenv/config";
import {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { BotCommand, BotClient } from "./types";
import { commandFiles, eventFiles } from "./files";
import keepAlive from "./server";
import addReactionRole from "./reactions"

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, any>;
  }
}

const bot = new Client<true>({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
}) as BotClient;

bot.commands = new Collection<string, any>();

addReactionRole();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`) as BotCommand;
  bot.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file.substring(0, file.length - 3)}`);

  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args, bot));
    continue;
  }

  bot.on(event.name, (...args) => event.execute(...args, bot));
}

bot.login(process.env.DISCORD_TOKEN);
keepAlive();
