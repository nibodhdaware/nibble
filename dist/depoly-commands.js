"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const files_1 = require("./files");
const commands = [];
for (const file of files_1.commandFiles) {
    const command = require(`./commands/${file.substring(0, file.length - 3)}`);
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
rest.put(v9_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
