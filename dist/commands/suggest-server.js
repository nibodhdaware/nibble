"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("suggest-server")
        .setDescription("Suggest a server feature to be added to the #suggestions.")
        .addStringOption((option) => option
        .setName("server-feature")
        .setDescription("The server feature you want to make.")
        .setRequired(true)),
    async execute(interaction) {
        const serverFeature = interaction.options.get("server-feature");
        if (interaction.guildId === null) {
            throw new Error("This belongs in a server.");
        }
        const channel = interaction.guild.channels.cache.find((channel) => channel.name === "suggestions");
        if (!channel) {
            throw new Error("No suggestions channel found.");
        }
        if (!(channel instanceof discord_js_1.ForumChannel)) {
            throw new Error("The suggestions channel is not a forum channel.");
        }
        await channel.threads.create({ name: 'Server Feature Suggestion', message: { content: `${serverFeature?.value}` }, appliedTags: [] });
        await interaction.reply({
            content: "Suggestion sent!",
            ephemeral: true,
        });
    },
};
