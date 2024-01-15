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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName("announce")
        .setDescription("Announce something to the server!")
        .addStringOption((option) => option
        .setName("announcement")
        .setDescription("The announcement to send")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcement = interaction.options.get("announcement");
            if (interaction.guildId === null) {
                throw new Error("This belongs in a server.");
            }
            const channel = interaction.guild.channels.cache.find((channel) => channel.name === "announcements");
            if (!channel) {
                throw new Error("No announcements channel found.");
            }
            if (!(channel instanceof discord_js_1.NewsChannel)) {
                throw new Error("The announcements channel is not a text channel.");
            }
            if (!interaction.member.roles.cache.has("1173226302644424755")) {
                interaction.reply({ content: "You can't make an announcement", ephemeral: true });
                return;
            }
            else {
                yield channel.send({ content: `@everyone\n${announcement === null || announcement === void 0 ? void 0 : announcement.value}` });
                yield interaction.reply({
                    content: "Announcement sent!",
                    ephemeral: true,
                });
            }
        });
    },
};
