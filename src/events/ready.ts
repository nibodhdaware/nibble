import { Client, Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client<true>) {
        console.log(`Logged in as ${client.user.tag}.`);
    },
};
