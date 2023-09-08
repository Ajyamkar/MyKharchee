import axios from "axios";

const instance = axios.create({
  baseURL: "https://mykharche-backend.onrender.com/",
});

export default instance;
