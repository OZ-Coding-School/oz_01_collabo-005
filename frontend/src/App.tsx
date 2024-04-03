import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/Topnav";
import Main from "./Pages/Main";
import MyInfo from "./Pages/Myinfo";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import Meet from "./Pages/Meet";

function App() {
  return (
    <div className="App">
      <TopNav />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/meet" element={<Meet />}></Route>
        <Route path="/myInfo" element={<MyInfo />}></Route>
        <Route path="signUp" element={<SignUp />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="*" element={<div> 없는 페이지임</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
