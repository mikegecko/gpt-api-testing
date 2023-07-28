const axios = require("axios");
const gpt_functions = require("../utils/GPT_functions");
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
          //functions: gpt_functions, //Functions count towards context length
          //functions_call: "auto", //Valid values are 'auto' , 'none' & specified(force call)
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
      //Check response data to see if GPT called a function, if so execute it and 
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
};
