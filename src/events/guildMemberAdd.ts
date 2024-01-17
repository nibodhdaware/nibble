import {
    GuildMember,
    EmbedBuilder,
    TextChannel,
    RGBTuple,
    Events,
} from "discord.js";
import config from "../config";
import { BotClient } from "../types";

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member: GuildMember, client: BotClient) {
        const nibodhGrey: RGBTuple = [21, 21, 21];
        const welcomeMessageEmbed = new EmbedBuilder()
            .setColor(nibodhGrey)
            .setTitle("New Member")
            .setDescription(
                `Welcome <!@${member.id}> to the N Dev server, enjoy your stay!`,
            );

        const welcomeChannel = client.channels.cache.get(
            config.welcomeChannelId,
        ) as TextChannel;
        welcomeChannel.send({ embeds: [welcomeMessageEmbed] });
    },
};
