"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield channel.threads.create({ name: 'Video Suggestion', message: { content: `${video === null || video === void 0 ? void 0 : video.value}` }, appliedTags: [] });
            yield interaction.reply({
                content: "Suggestion sent!",
                ephemeral: true,
                fetchReply: true
            });
        });
    },
};
