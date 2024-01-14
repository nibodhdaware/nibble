import { GuildMember, EmbedBuilder, TextChannel, RGBTuple } from "discord.js";
import config from "../config";
import { BotClient } from "../types";

module.exports = {
  name: "guildMemberAdd",
  async execute(member: GuildMember, client: BotClient) {
    const nibodhGrey: RGBTuple = [21, 21, 21];
    const welcomeMessageEmbed = new EmbedBuilder()
      .setColor(nibodhGrey)
      .setTitle("New Member")
      .setDescription(
        `Welcome <!@${member.id}> to the conaticus server, enjoy your stay!`
      );

    const welcomeChannel = client.channels.cache.get(
      config.welcomeChannelId
    ) as TextChannel;
    welcomeChannel.send({ embeds: [welcomeMessageEmbed] });
  },
};
