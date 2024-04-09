import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import TopNav from "./Components/Topnav";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import MyInfo from "./Pages/Myinfo";
import Meet from "./Pages/Myinfo/Mymeet";
import SignUp from "./Pages/Signup";

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
      <Footer />
    </div>
  );
}

export default App;
