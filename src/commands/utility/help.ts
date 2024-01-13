import { CommandInteraction, SlashCommandBuilder, Collection } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import path from 'path';
import fs from 'fs';

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Know more about what Nibble can do"),
  async execute(interaction: CommandInteraction<"cached">) {
    const commands = new Map<string, any>();
    const embed = new EmbedBuilder(); // Create a single embed

    const foldersPath = path.join(__dirname, "../../commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ("data" in command && "execute" in command) {
          commands.set(command.data.name, command.data.description);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
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
