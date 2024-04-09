import axios from "axios";
export const login = async (id: string, pw: string) => {
  const result = await axios.post("내가 보낼 곳", { id, pw });
  return result.data.data;
};
//로그인 axios
