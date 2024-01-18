"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const files_1 = require("../files");
module.exports = {
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("Know more about what Nibble can do"),
    async execute(interaction) {
        const commands = new discord_js_1.Collection();
        const embed = new builders_1.EmbedBuilder();
        for (const file of files_1.commandFiles) {
            const command = require(`./${file}`);
            commands.set(command.data.name, command.data.description);
        }
        let commandDescriptions = "";
        for (const [commandName, commandDescription] of commands) {
            commandDescriptions += `\`/${commandName}\`: ${commandDescription}\n`;
        }
        embed.setDescription(commandDescriptions);
        await interaction.reply({ embeds: [embed] });
    },
};
