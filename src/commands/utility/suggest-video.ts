import {
    ActionRowBuilder,
    CommandInteraction,
    ForumChannel,
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from "discord.js";
import {EmbedBuilder, RGBTuple} from "@discordjs/builders";

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("suggest-video")
        .setDescription("Suggest a video to be added to the #video-ideas.")
        .addStringOption((option) =>
            option
                .setName("video-title")
                .setDescription("Add a video ideas which you think I should make")
                .setRequired(true),
        ),
    async execute(interaction: CommandInteraction<"cached">) {
        const video = interaction.options.get("video-title");
        const select = new StringSelectMenuBuilder()
            .setCustomId("language-selection")
            .setPlaceholder("Select a language")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Python")
                    .setDescription("Python")
                    .setValue("python"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("JavaScript")
                    .setDescription("JavaScript")
                    .setValue("javascript"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("TypeScript")
                    .setDescription("TypeScript")
                    .setValue("typescript"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Java")
                    .setDescription("Java")
                    .setValue("java"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("C#")
                    .setDescription("C#")
                    .setValue("csharp"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("C++")
                    .setDescription("C++")
                    .setValue("cplusplus"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("C")
                    .setDescription("C")
                    .setValue("c"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Rust")
                    .setDescription("Rust")
                    .setValue("rust"),
            )
        const row = new ActionRowBuilder().addComponents(select);
        if (interaction.guildId === null) {
            throw new Error("This belongs in a server.");
        }

        const channel = interaction.guild.channels.cache.find(
            (channel) => channel.name === "suggestions",
        );
        if (!channel) {
            throw new Error("No suggestion channel found.");
        }
        if (!(channel instanceof ForumChannel)) {
            throw new Error("The suggestions channel is not a forum channel.");
        }
        await channel.threads.create({ name: 'Video Suggestion', message: { content: `${video?.value}` }, appliedTags: [] });
        await interaction.reply({
            content: "Suggestion sent!",
            ephemeral: true,
            fetchReply: true
        });
    },
}