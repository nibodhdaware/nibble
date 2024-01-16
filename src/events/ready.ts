import { Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: any) {
        console.log(`Logged in as ${client.user.tag}.`);
    },
};
