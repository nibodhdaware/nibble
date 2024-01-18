"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("suggest-video")
        .setDescription("Suggest a video to be added to the #video-ideas.")
        .addStringOption((option) => option
        .setName("video-title")
        .setDescription("Add a video ideas which you think I should make")
        .setRequired(true)),
    async execute(interaction) {
        const video = interaction.options.get("video-title");
        const select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("language-selection")
            .setPlaceholder("Select a language")
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Python")
            .setDescription("Python")
            .setValue("python"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("JavaScript")
            .setDescription("JavaScript")
            .setValue("javascript"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("TypeScript")
            .setDescription("TypeScript")
            .setValue("typescript"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Java")
            .setDescription("Java")
            .setValue("java"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("C#")
            .setDescription("C#")
            .setValue("csharp"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("C++")
            .setDescription("C++")
            .setValue("cplusplus"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("C")
            .setDescription("C")
            .setValue("c"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Rust")
            .setDescription("Rust")
            .setValue("rust"));
        const row = new discord_js_1.ActionRowBuilder().addComponents(select);
        if (interaction.guildId === null) {
            throw new Error("This belongs in a server.");
        }
        const channel = interaction.guild.channels.cache.find((channel) => channel.name === "suggestions");
        if (!channel) {
            throw new Error("No suggestion channel found.");
        }
        if (!(channel instanceof discord_js_1.ForumChannel)) {
            throw new Error("The suggestions channel is not a forum channel.");
        }
        await channel.threads.create({ name: 'Video Suggestion', message: { content: `${video?.value}` }, appliedTags: [] });
        await interaction.reply({
            content: "Suggestion sent!",
            ephemeral: true,
            fetchReply: true
        });
    },
};
