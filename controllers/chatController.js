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
          functions: gpt_functions.functionDefinitions, //Functions count towards context length gpt_functions.functionDefinitions
          //functions_call: "auto", //Valid values are 'auto' , 'none' & specified(force call) THIS CAUSES A BAD REQUEST ERROR
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
      if (response_message.hasOwnProperty("function_call")) {
        //Call function & check if JSON response is valid
        const available_functions = {
          get_player_data: gpt_functions.get_player_data,
          set_player_data: gpt_functions.set_player_data,
          test_function: gpt_functions.test_function,
        };
        const function_name = response_message.function_call.name;
        const function_to_call = available_functions[function_name];
        if(typeof function_to_call === 'undefined') {
          return res.json({
            error: "Function not found"
          })
        }
        const function_args = JSON.parse(
          response_message.function_call.arguments
        );
        console.log(function_to_call);
        console.log(function_name);
        const function_response = await function_to_call(function_args);
        const function_response_data = {
          role: "function",
          name: function_name,
          content: function_response,
        }
        //Now we need to send function response back to API with messages -> handle context length errors aswell
        messages.push(response_message);
        messages.push({
          role: "function",
          name: function_name,
          content: function_response,
        });
        const second_response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo-0613",
            messages: messages, //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
            functions: gpt_functions.functionDefinitions, //Functions count towards context length
            //functions_call: "auto", //Valid values are 'auto' , 'none' & specified(force call) THIS CAUSES A BAD REQUEST ERROR
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_APIKEY}`,
            },
          }
        );
        const second_response_data = second_response.data;
        return res.json({ response_message, function_response_data, second_response_data});
      }
      //If no function called, return response
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  },
};
