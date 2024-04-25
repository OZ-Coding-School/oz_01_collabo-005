import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/Topnav";
import UserContext from "./Context/Authuser";
import ClubCategory from "./Pages/Clubcategory";
import CreateBoard from "./Pages/Createboard";
import CreateMeet from "./Pages/Createmeet";
import CreateSchedules from "./Pages/Createschedules";
import FeedScreen from "./Pages/FeedScreen";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import MeetHome from "./Pages/Meethome";
import MemberList from "./Pages/Meethome/MemberList";
import MyInfo from "./Pages/Myinfo";
import MyMeet from "./Pages/Mymeet";
import SignUp from "./Pages/Signup";
import Success from "./Pages/Signup/Success";
import PrivateRoute from "./Privateroute/Privateroute";
import { AuthData } from "./Type/User";

//유저 데이터 들어오면 , 저장하는 것
export function setAuthDataToLocalStorage(data: {
  first_name: string;
  last_name: string;
  refreshToken: string;
  accessToken: string;
  pk: number;
}) {
  localStorage.setItem("first_name", data.first_name);
  localStorage.setItem("last_name", data.last_name);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("pk", String(data.pk));
  return data;
}

//유저 정보 들어오는 곳
function getAuthDataFormLocalStorage(): AuthData {
  let isAuth = true;
  const result = {
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
    pk: Number(localStorage.getItem("pk")),
  };

  Object.keys(result).forEach((key) => {
    if (result[key] === null) {
      isAuth = false;
    }
  });

  if (isAuth) {
    return result;
  } else {
    return null;
  }
}

function App() {
  const [userInfo, setUserInfo] = useState<AuthData>(
    getAuthDataFormLocalStorage(),
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <TopNav />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
          <Route path="/signUp/Success" element={<Success />} />
          <Route path="/clubCategory/:id" element={<ClubCategory />}></Route>

          <Route element={<PrivateRoute />}>
            <Route path="/myMeet" element={<MyMeet />}></Route>
            <Route path="/meetHome/:id" element={<MeetHome />}></Route>
            <Route path="/clubs/:id/members" element={<MemberList />} />
            <Route path="/myInfo/" element={<MyInfo />}></Route>
            <Route path="createMeet" element={<CreateMeet />}></Route>
            <Route path="/createBoard/:id" element={<CreateBoard />}></Route>
            <Route
              path="/feedScreen/:id/:postId"
              element={<FeedScreen />}
            ></Route>
            <Route
              path="/createSchedules/:id"
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
