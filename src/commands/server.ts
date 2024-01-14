import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server info!"),
    async execute(interaction: CommandInteraction<"cached">) {
        await interaction.reply(
            `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
        );
    },
};
