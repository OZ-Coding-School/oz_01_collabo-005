/// <reference types="vite/client" />

import axios from "axios";
import getAccessToken from "../Components/Getaccess";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use((response) => {
  return response;
}, getAccessToken);

export default instance;
