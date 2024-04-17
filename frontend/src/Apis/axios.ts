import axios from "axios";

const instance = axios.create({
  baseURL: "http://ec2-43-201-99-46.ap-northeast-2.compute.amazonaws.com/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default instance;
