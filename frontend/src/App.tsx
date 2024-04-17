import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/Topnav";
import CreateBoard from "./Pages/Createboard";
import CreateMeet from "./Pages/Createmeet";
import CreateSchedules from "./Pages/Createschedules";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import MeetHome from "./Pages/Meethome";
import MyInfo from "./Pages/Myinfo";
import MyMeet from "./Pages/Mymeet";
import SignUp from "./Pages/Signup";
import Success from "./Pages/Signup/Success";
import { useState } from "react";
import UserContext from "./Context/Authuser";
import PrivateRoute from "./Privateroute/Privateroute";

function App() {
  const [userInfo, setUserInfo] = useState({
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <TopNav />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="/signUp/Success" element={<Success />} />

          <Route element={<PrivateRoute />}>
            <Route path="/myMeet" element={<MyMeet />}></Route>
            <Route path="/myInfo" element={<MyInfo />}></Route>
            <Route path="/meetHome" element={<MeetHome />}></Route>
            <Route path="createMeet" element={<CreateMeet />}></Route>
            <Route path="/createBoard" element={<CreateBoard />}></Route>
            <Route
              path="/createSchedules"
              element={<CreateSchedules />}
            ></Route>
            <Route path="*" element={<div> 없는 페이지임</div>}></Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
