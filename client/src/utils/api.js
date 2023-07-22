import axios from "axios";

export const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", {
        username,
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

export const createUser = async (username, password) => {
  try{
    const response = await axios.post("/auth/signup", {
      username,
      password,
    });
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};

export const logout = async () => {
  localStorage.removeItem("gptapi-token");
};