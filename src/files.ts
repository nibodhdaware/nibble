import fs from "fs";

const commandFiles = fs
    .readdirSync("./dist/commands")
    .filter((file) => file.endsWith(".js"));

const eventFiles = fs
    .readdirSync("./dist/events")
    .filter((file) => file.endsWith(".js"));

export { commandFiles, eventFiles };
