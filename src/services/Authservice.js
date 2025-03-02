import axios from "axios";

export const login = async (email, password) => {
  return await axios.post("http://localhost:5000/api/login", { email, password });
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
