import { useState } from "react";
import "./index.css";
import axios from "axios";

function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // 로그인 정보 객체 생성
    const loginData = {
      id: id,
      password: password,
    };

    // 서버로 POST 요청 보내기
    axios
      .post(
        "http://ec2-43-201-73-9.ap-northeast-2.compute.amazonaws.com:8000/api/accounts/login",
        loginData,
      )
      .then((response) => {
        console.log("로그인 성공:", response.data); // 서버로부터 받은 응답 데이터 출력
        const { accessToken } = response.data;
        setAccessToken(accessToken); // 받은 Access 토큰을 상태에 저장합니다.
        fetchDataWithToken(); // 로그인 후 데이터 요청
      })
      .catch((error) => {
        console.error("로그인 실패:", error); // 요청 실패 시 에러 출력
      });
  };

  // 서버 요청 시에 Access 토큰을 함께 보내는 함수
  const fetchDataWithToken = () => {
    axios
      .get(
        "http://ec2-43-201-73-9.ap-northeast-2.compute.amazonaws.com:8000/api/accounts/login",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Access 토큰을 헤더에 포함하여 보냅니다.
          },
        },
      )
      .then((response) => {
        console.log("데이터 요청 성공:", response.data);
        // 데이터를 처리하는 로직을 추가합니다.
      })
      .catch((error) => {
        console.error("데이터 요청 실패:", error);
      });
  };

  return (
    <div className="loginContainer">
      <div className="loginSmallContainer">
        <div className="landingText">LANDING</div>
        <form
          method="post"
          name="login-form"
          action="http://ec2-43-201-73-9.ap-northeast-2.compute.amazonaws.com:8000/api/accounts/login"
          id="loginForm"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" value="Login" className="loginButton" />
        </form>
        <div className="enterJoin">
          <a href="/signup">회원가입</a>
          <a href="아직모름">로그인 수단 찾기</a>
        </div>
        <div>or</div>
      </div>
    </div>
  );
}

export default Login;
