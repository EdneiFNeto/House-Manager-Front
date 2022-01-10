import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.108:3001",
  headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}
});

export { api };
