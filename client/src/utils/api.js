import axios from "axios";
import jwtDecode from "jwt-decode";

export const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("gptapi-token", response.data.token);
      return response.data;
    } catch (error) {
      console.error(error);
      if(error.response){
        return error.response.data;
      } else{
        throw error;
      }
    }
};

export const createUser = async (email, password) => {
  try{
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
    });
    return response;
  }
  catch(error){
    console.error(error);
  }
};

export const verify = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get("/api/auth/verify", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  localStorage.removeItem("gptapi-token");
};

export const decodeToken = async (token) => {
  const decoded = jwtDecode(token);
  return decoded;
}
// Max context is 4096 tokens at $0.0015 / 1K tokens
export const gptChatCompletion = async( formattedMessageArray, apiToken ) => {
  try{
    const res = await axios.post('https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [...formattedMessageArray], //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      }
    }
    );
    return res.data;
  } catch(error) {
    console.error('Error requesting GPT completion', error);
  }
}

export const gptProxyChatCompletion = async(formattedMessageArray) => {
  try {
    const res = await axios.post('/api/chat/request',
    {
      model: 'gpt-3.5-turbo',
      messages: [...formattedMessageArray], //Formatted messages example [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
      temperature: 0.7,
    },
    
    );
    return res.data;
  } catch (error) {
    console.error('Error requesting GPT completion', error)
  }
}