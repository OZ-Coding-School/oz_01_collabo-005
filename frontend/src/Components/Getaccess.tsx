import axios from "axios";
import instance from "../Apis/axios";

const getAccessToken = async (error) => {
  if (error.response && error.response.status === 403) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await instance.post(
        "api/accounts/token/refresh/",
        {
          refresh: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // 여기에 추가적인 헤더를 설정할 수 있습니다.
          },
        },
      );
      const newAccessToken = response.data.access;

      localStorage.setItem("accessToken", newAccessToken);
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      // console.log("access 재발급 성공");
      return axios.request(error.config);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      throw error;
    }
  }
  return Promise.reject(error);
};

export default getAccessToken;
