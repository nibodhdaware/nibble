import { Events, Message, PermissionsBitField } from "discord.js";

const forbiddenPhrases: string[] = ["discord.gg"];

module.exports = {
    name: Events.MessageCreate,
    execute(message: Message) {
        forbiddenPhrases.forEach((phrase) => {
            if (message.content.includes(phrase)) message.delete();
        });

        if (
            message.mentions.users.size > 5 &&
            !message.member?.permissions.has(
                PermissionsBitField.Flags.MentionEveryone,
            )
        ) {
            message.delete();
        }
    },
};
