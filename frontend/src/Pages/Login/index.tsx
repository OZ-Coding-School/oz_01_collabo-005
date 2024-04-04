import "./index.css";

function Login() {
  return (
    <div className="loginContainer">
      <div className="loginSmallContainer">
        <form
          method="post"
          name="login-form"
          action="전송되는 서버"
          id="loginForm"
        >
          <input name="userId" type="text" placeholder="ID" />
          <input name="userPassword" type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
        <div className="enterJoin">
          <a href="아직모름">이메일 회원가입</a>
          <a href="아직모름">로그인 수단 찾기</a>
        </div>
        <div>or</div>
        <div className="inGoogle">google</div>
      </div>
    </div>
  );
}

export default Login;
