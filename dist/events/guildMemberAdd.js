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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("../config"));
module.exports = {
    name: discord_js_1.Events.GuildMemberAdd,
    execute(member, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const nibodhGrey = [21, 21, 21];
            const welcomeMessageEmbed = new discord_js_1.EmbedBuilder()
                .setColor(nibodhGrey)
                .setTitle("New Member")
                .setDescription(`Welcome <!@${member.id}> to the conaticus server, enjoy your stay!`);
            const welcomeChannel = client.channels.cache.get(config_1.default.welcomeChannelId);
            welcomeChannel.send({ embeds: [welcomeMessageEmbed] });
        });
    },
};
