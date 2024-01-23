import {
    Collection,
    CommandInteraction,
    SlashCommandBuilder,
} from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import { BotCommand } from "../types";
import { commandFiles } from "../files";

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Know more about what Nibble can do"),
    async execute(interaction: CommandInteraction<"cached">) {
        const commands = new Collection<string, any>();
        const embed = new EmbedBuilder(); // Create a single embed

        for (const file of commandFiles) {
            const command = require(`./${file}`) as BotCommand;
            commands.set(command.data.name, command.data.description);
        }

        // Build the embed with all commands
        let commandDescriptions = "";
        for (const [commandName, commandDescription] of commands) {
            commandDescriptions += `\`/${commandName}\`: ${commandDescription}\n`;
        }
        embed.setDescription(commandDescriptions);

        // Send the single embed with all commands
        await interaction.reply({ embeds: [embed] });
    },
};
