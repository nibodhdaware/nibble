"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("../config"));
module.exports = {
    name: discord_js_1.Events.GuildMemberAdd,
    once: true,
    async execute(member, client) {
        const nibodhGrey = [21, 21, 21];
        const welcomeMessageEmbed = new discord_js_1.EmbedBuilder()
            .setColor(nibodhGrey)
            .setTitle("New Member")
            .setDescription(`Welcome <!@${member.id}> to the N Den server, enjoy your stay!`);
        const welcomeChannel = client.channels.cache.get(config_1.default.welcomeChannelId);
        welcomeChannel.send({ embeds: [welcomeMessageEmbed] });
    },
};
