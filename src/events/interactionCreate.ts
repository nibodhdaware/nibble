import { Events } from "discord.js";
import { BotClient } from "../types";

module.exports = {
    name: Events.InteractionCreate,
    once: true,
    async execute(interaction: any, client: BotClient) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "There was an error while executing this command.",
                ephemeral: true,
            });
        }
    },
};
