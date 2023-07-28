const axios = require("axios");
const gpt_functions = require("../utils/GPT_functions");

module.exports = {
  chatRequest: async (req, res, next) => {
    try {
        // Add user JWT verification to make sure the request is coming from a signed in user
      //Forward request to OpenAI chat completion API and return response
      const messages = req.body.messages;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-0613",
          messages: messages, //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
          //functions: gpt_functions.functionDefinitions, //Functions count towards context length
          functions_call: "auto", //Valid values are 'auto' , 'none' & specified(force call)
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
      const response_message = data.choices[0].message;
      //Check response data to see if GPT called a function, if so execute it
      if(response_message.includes("function_call"))
      {
        //Call function & check if JSON response is valid
        const available_functions = {
          getPlayerData: gpt_functions.get_player_data,
        }
      const function_name = response_message.function_call.name;
      const function_to_call = available_functions[function_name];
      const function_args = JSON.parse(response_message.function_call.arguments);
      const function_response = function_to_call(function_args);
      //Now we need to send function response back to API with messages -> handle context length errors aswell
      messages.push(response_message);
      messages.push({
        role: 'function',
        name: function_name,
        content: function_response,
      });
      const second_response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-0613",
          messages: messages, //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
          //functions: gpt_functions, //Functions count towards context length
          functions_call: "auto", //Valid values are 'auto' , 'none' & specified(force call)
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_APIKEY}`,
          },
        }
      );
      return res.json(second_response.data);
      }
      //If no function called, return response
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
};
