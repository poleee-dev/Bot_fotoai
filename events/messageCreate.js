const {
  AttachmentBuilder,
  EmbedBuilder
} = require("discord.js");

const { generateImage } = require("../openai");
const { channelId } = require("../config");

const cooldown = new Set();

module.exports = (client) => {

  client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    if (message.channel.id !== channelId) return;

    if (cooldown.has(message.author.id)) {
      return message.reply(
        "⏳ Tunggu beberapa detik sebelum membuat gambar lagi."
      );
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 15000);

    const prompt = message.content;

    const loading = await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎨 AI Image Generator")
          .setDescription("Sedang membuat gambar...")
      ]
    });

    try {

      const image = await generateImage(prompt);

      const buffer = Buffer.from(
        image,
        "base64"
      );

      const file = new AttachmentBuilder(
        buffer,
        {
          name: "image.png"
        }
      );

      await loading.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Image Generated")
            .setDescription(prompt)
            .setImage("attachment://image.png")
        ],
        files: [file]
      });

    } catch (err) {

      console.error(err);

      await loading.edit({
        content:
          "❌ Gagal membuat gambar."
      });

    }

  });

};
