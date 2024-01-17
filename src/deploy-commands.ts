import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commandFiles } from "./files";
import { BotCommand } from "./types";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const commands: object[] = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file.substring(
        0,
        file.length - 3,
    )}`) as BotCommand;
    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(
            `[WARNING] The command is missing a required "data" or "execute" property.`,
        );
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID as string,
                process.env.GUILD_ID as string,
            ),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
})();
