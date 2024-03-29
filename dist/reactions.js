"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reaction_role_1 = require("reaction-role");
const reactionClient = new reaction_role_1.ReactionRole({
    token: process.env.DISCORD_TOKEN,
});
async function addReactionRole() {
    const typescript = reactionClient.createOption({
        clickable_id: "1174179523399528488",
        roles: ["1195913918313406505"],
        type: reaction_role_1.EType.NORMAL
    });
    const javascript = reactionClient.createOption({
        clickable_id: "1174179511844208680",
        roles: ["1195913918313406505"],
        type: reaction_role_1.EType.NORMAL
    });
    const python = reactionClient.createOption({
        clickable_id: "1174179519758860419",
        roles: ["1195913708036173877"],
        type: reaction_role_1.EType.NORMAL
    });
    const rust = reactionClient.createOption({
        clickable_id: "1174177932655202385",
        roles: ["1174177932655202385"],
        type: reaction_role_1.EType.NORMAL
    });
    const c = reactionClient.createOption({
        clickable_id: "1174179492906934382",
        roles: ["1195914093396250654"],
        type: reaction_role_1.EType.NORMAL
    });
    const cpp = reactionClient.createOption({
        clickable_id: "1174179506907512932",
        roles: ["1195914093396250654"],
        type: reaction_role_1.EType.NORMAL
    });
    const cs = reactionClient.createOption({
        clickable_id: "1174179497688453140",
        roles: ["1195914212866793552"],
        type: reaction_role_1.EType.NORMAL
    });
    const java = reactionClient.createOption({
        clickable_id: "1195999383263662150",
        roles: ["1195971089067687986"],
        type: reaction_role_1.EType.NORMAL
    });
    await reactionClient.createMessage({
        channel_id: "1173233674171469824",
        clickables: [typescript, javascript, python, rust, c, cpp, cs, java],
        message_id: "1173234394379591750"
    });
    reactionClient.init();
}
exports.default = addReactionRole;
