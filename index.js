const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const { token } = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`${client.user.tag} online`);
});

require("./events/messageCreate")(client);

client.login(token);