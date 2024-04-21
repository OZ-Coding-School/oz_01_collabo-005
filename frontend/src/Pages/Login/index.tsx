import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import instance from "../../Apis/axios";
import { setAuthDataToLocalStorage } from "../../App";
import UserContext from "../../Context/Authuser";
import "./index.css";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo, setUserInfo }: any = useContext(UserContext);

  const navigate = useNavigate();

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
      const { first_name, last_name, pk } = response.data.user;
      alert(`환영합니다 ${first_name}${last_name}님`);
      const userData = setAuthDataToLocalStorage({
        first_name,
        last_name,
        refreshToken: refresh,
        accessToken: access,
        pk,
      });
      setUserInfo(userData);
      navigate("/");
    } catch (error) {
      alert("유효하지 않은 계정입니다.");
    }
  };

  //로그인 유무 확인
  const isLogin = !!localStorage.getItem("refreshToken");
  if (isLogin) {
    return <Navigate to="/" replace />;
  }

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
