import dotenv from "dotenv";
import {Client, Collection, Events, GatewayIntentBits, Partials} from "discord.js";
import fs from "fs";
import path from "path";

dotenv.config();

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
});

bot.commands = new Collection<string, any>();

const foldersPath = path.join(__dirname, "./commands");
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            bot.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
            );
        }
    }
}

bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.inGuild()) return;
    if (!interaction.isChatInputCommand()) return;
    const command = bot.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`,
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
});

bot.on(Events.GuildMemberAdd, async (interaction) => {
    const channel = interaction.guild.channels.cache.find(
        (channel) => channel.name === "introduction",
    );
    if (!channel) return;
    await interaction.send(`Welcome to the server, ${interaction.displayName}`);
});

bot.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user?.tag}`);
});

bot.login(process.env.DISCORD_TOKEN).then(r => console.log(`Logged in as ${bot.user?.tag}`));
