import {
  EmbedBuilder,
  RGBTuple,
  SlashCommandBuilder,
} from "@discordjs/builders";
import { CommandInteraction, NewsChannel } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announce something to the server!")
    .addStringOption((option) =>
      option
        .setName("announcement")
        .setDescription("The announcement to send")
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction<"cached">) {
    const announcement = interaction.options.get("announcement");
    if (interaction.guildId === null) {
      throw new Error("This belongs in a server.");
    }

    const channel = interaction.guild.channels.cache.find(
      (channel) => channel.name === "announcements",
    );
    if (!channel) {
      throw new Error("No announcements channel found.");
    }
    if (!(channel instanceof NewsChannel)) {
      throw new Error("The announcements channel is not a text channel.");
    }
    const nibodhGrey: RGBTuple = [21, 21, 21];
    const embed = new EmbedBuilder()
      .setColor(nibodhGrey)
      .setTitle("Announcement")
      .setDescription(`@everyone\n${announcement?.value}` as string)
      .setTimestamp();
    await channel.send({ embeds: [embed] });
    await interaction.reply({
      content: "Announcement sent!",
      ephemeral: true,
    });
  },
};