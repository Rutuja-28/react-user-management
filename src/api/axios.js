import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/users",
  headers: {
    "Content-Type":
      "application/json",
  },
});

export default api;