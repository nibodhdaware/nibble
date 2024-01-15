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
        .setName("suggest-server")
        .setDescription("Suggest a server feature to be added to the #suggestions.")
        .addStringOption((option) => option
        .setName("server-feature")
        .setDescription("The server feature you want to make.")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield channel.threads.create({ name: 'Server Feature Suggestion', message: { content: `${serverFeature === null || serverFeature === void 0 ? void 0 : serverFeature.value}` }, appliedTags: [] });
            yield interaction.reply({
                content: "Suggestion sent!",
                ephemeral: true,
            });
        });
    },
};
