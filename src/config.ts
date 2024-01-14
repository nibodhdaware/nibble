import { ColorResolvable } from "discord.js";

interface IConfig {
  suggestionsChannelId: string;
  welcomeChannelId: string;
  announcementsChannelId: string;
  announcementsRoleId: string;
  guildId: string;
}

const config: IConfig = {
  suggestionsChannelId: "1173773665024880681",
  welcomeChannelId: "1173276562565640253",
  announcementsChannelId: "1173266987212869662",
  announcementsRoleId: "1173226302644424755",
  guildId: "1043516326007816312",
};

export default config;
