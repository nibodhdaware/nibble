import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {EmbedBuilder} from "@discordjs/builders";

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction: CommandInteraction<"cached">) {
        const embed = new EmbedBuilder().setDescription("Pong!")
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
