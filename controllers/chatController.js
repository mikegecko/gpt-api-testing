const axios = require("axios");
module.exports = {
  chatRequest: async (req, res, next) => {
    try {
        // Add user JWT verification to make sure the request is coming from a signed in user
      //Forward request to OpenAI chat completion API and return response
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: req.body.messages, //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_APIKEY}`,
          },
        }
      );
      const data = response.data;
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
};
