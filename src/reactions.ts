import { ReactionRole, EType } from "reaction-role";
import config from "./config";

const reactionClient = new ReactionRole({
    token: process.env.DISCORD_TOKEN as string,
});

async function addReactionRole() {
    const typescript = reactionClient.createOption({
        clickable_id: "1174179523399528488",
        roles: ["1195913918313406505"],
        type: EType.NORMAL,
    });
    const javascript = reactionClient.createOption({
        clickable_id: "1174179511844208680",
        roles: ["1195913918313406505"],
        type: EType.NORMAL,
    });
    const python = reactionClient.createOption({
        clickable_id: "1174179519758860419",
        roles: ["1195913708036173877"],
        type: EType.NORMAL,
    });
    const rust = reactionClient.createOption({
        clickable_id: "1174177932655202385",
        roles: ["1174177932655202385"],
        type: EType.NORMAL,
    });
    const c = reactionClient.createOption({
        clickable_id: "1174179492906934382",
        roles: ["1195914093396250654"],
        type: EType.NORMAL,
    });
    const cpp = reactionClient.createOption({
        clickable_id: "1174179506907512932",
        roles: ["1195914093396250654"],
        type: EType.NORMAL,
    });
    const cs = reactionClient.createOption({
        clickable_id: "1174179497688453140",
        roles: ["1195914212866793552"],
        type: EType.NORMAL,
    });
    const java = reactionClient.createOption({
        clickable_id: "1195999383263662150",
        roles: ["1195971089067687986"],
        type: EType.NORMAL,
    });

    await reactionClient.createMessage({
        channel_id: config.ruleChannelId,
        clickables: [typescript, javascript, python, rust, c, cpp, cs, java],
        message_id: config.ruleMessageId,
    });

    reactionClient.init();
}

export default addReactionRole;
