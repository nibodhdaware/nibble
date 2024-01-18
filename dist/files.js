"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFiles = exports.commandFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commandsFolder = path_1.default.join(__dirname, "./commands");
const commandFiles = fs_1.default
    .readdirSync(commandsFolder)
    .filter((file) => file.endsWith(".ts"));
exports.commandFiles = commandFiles;
const eventsFolder = path_1.default.join(__dirname, "./events");
const eventFiles = fs_1.default
    .readdirSync(eventsFolder)
    .filter((file) => file.endsWith(".ts"));
exports.eventFiles = eventFiles;
