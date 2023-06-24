const { Configuration, OpenAIApi } = require("openai");
const API_KEY = "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";
const configuration = new Configuration({ apiKey: API_KEY });
const openai = new OpenAIApi(configuration);
exports.getChatText = async (req, res) => {
  console.log("Hello");
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0,
      top_p: 1,
    });

    return res
      .status(200)
      .send({
        text: completion.data.choices[0].message.content ?? "Server Error!",
      });
  } catch (error) {
    console.error({
      title: "getChatText",
      message: error.message,
      date: new Date(),
    });
    return res.status(500).send("Server Error");
  }
};
