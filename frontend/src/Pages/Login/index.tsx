import { useState } from "react";
import "./index.css";
import instance from "../../Apis/axios";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("api/accounts/login/", {
        email,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      console.log("로그인 성공");
    } catch (error) {
      console.log("로그인 실패", error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginSmallContainer">
        <div className="landingText">LANDING</div>
        <form name="login-form" id="loginForm" onSubmit={handleSubmit}>
          <input
            name="email"
            type="text"
            placeholder="ID"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            name="password"
            type={showPassword ? "text" : "password"} //비밀번호 타입
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" value="Login" className="loginButton" />
        </form>
        <div className="enterJoin">
          <button onClick={toggleShowPassword} className="HidePasswordButton">
            {showPassword ? "비밀번호 숨김" : "비밀번호 표시"}
          </button>
          <a href="아직모름">로그인 수단 찾기</a>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
