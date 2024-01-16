import fs from "fs";

const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));

const eventFiles = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));

export { commandFiles, eventFiles };
