"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
module.exports = {
    cooldown: 5,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("Know more about what Nibble can do"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = new Map();
            const embed = new builders_1.EmbedBuilder();
            const foldersPath = path_1.default.join(__dirname, "../commands");
            const commandFolders = fs_1.default.readdirSync(foldersPath);
            for (const folder of commandFolders) {
                const commandsPath = path_1.default.join(foldersPath, folder);
                const commandFiles = fs_1.default
                    .readdirSync(commandsPath)
                    .filter((file) => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const filePath = path_1.default.join(commandsPath, file);
                    const command = require(filePath);
                    if ("data" in command && "execute" in command) {
                        commands.set(command.data.name, command.data.description);
                    }
                    else {
                        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                    }
                }
            }
            let commandDescriptions = "";
            for (const [commandName, commandDescription] of commands) {
                commandDescriptions += `\`/${commandName}\`: ${commandDescription}\n`;
            }
            embed.setDescription(commandDescriptions);
            yield interaction.reply({ embeds: [embed] });
        });
    },
};
