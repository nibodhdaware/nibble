"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFiles = exports.commandFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const commandFiles = fs_1.default
    .readdirSync("./dist/commands")
    .filter((file) => file.endsWith(".js"));
exports.commandFiles = commandFiles;
const eventFiles = fs_1.default
    .readdirSync("./dist/events")
    .filter((file) => file.endsWith(".js"));
exports.eventFiles = eventFiles;
