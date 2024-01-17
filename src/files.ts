import fs from "fs";
import path from "path";

const commandsFolder = path.join(__dirname, "./commands");
const commandFiles = fs
    .readdirSync(commandsFolder)
    .filter((file) => file.endsWith(".ts"));

const eventsFolder = path.join(__dirname, "./events");
const eventFiles = fs
    .readdirSync(eventsFolder)
    .filter((file) => file.endsWith(".ts"));

export { commandFiles, eventFiles };
