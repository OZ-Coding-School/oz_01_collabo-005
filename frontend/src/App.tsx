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
function App() {
  return (
    <div className="App">
      <TopNav />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" Component={Login} />
        <Route path="/myMeet" element={<MyMeet />}></Route>
        <Route path="/myInfo" element={<MyInfo />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signUp/Success" element={<Success />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/meetHome" element={<MeetHome />}></Route>
        <Route path="createMeet" element={<CreateMeet />}></Route>
        <Route path="/createBoard" element={<CreateBoard />}></Route>
        <Route path="/createSchedules" element={<CreateSchedules />}></Route>
        <Route path="*" element={<div> 없는 페이지임</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
