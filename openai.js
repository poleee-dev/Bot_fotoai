const OpenAI = require("openai");
const { openaiKey } = require("./config");

const client = new OpenAI({
  apiKey: openaiKey
});

async function generateImage(prompt) {

  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024"
  });

  return result.data[0].b64_json;
}

module.exports = {
  generateImage
};