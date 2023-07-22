import axios from "axios";

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