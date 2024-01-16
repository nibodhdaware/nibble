"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const files_1 = require("./files");
const server_1 = __importDefault(require("./server"));
const reactions_1 = __importDefault(require("./reactions"));
const bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel, discord_js_1.Partials.Reaction],
});
bot.commands = new discord_js_1.Collection();
(0, reactions_1.default)();
for (const file of files_1.commandFiles) {
    const command = require(`./src/commands/${file}`);
    bot.commands.set(command.data.name, command);
}
for (const file of files_1.eventFiles) {
    const event = require(`./src/events/${file.substring(0, file.length - 3)}`);
    if (event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
        continue;
    }
    bot.on(event.name, (...args) => event.execute(...args, bot));
}
bot.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("Logged in!");
});
(0, server_1.default)();
