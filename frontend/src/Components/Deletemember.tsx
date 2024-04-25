import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../Apis/axios";
import UserContext from "../Context/Authuser";
import "./Deletemember.css";

function Deletemember() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo }: any = useContext(UserContext);

  const logoutHandler = () => {
    const refresh = localStorage.getItem("refreshToken");
    instance.post("api/accounts/logout/", { refresh: refresh });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("pk");
    setUserInfo(null);
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
      axios;
      instance
        .delete("api/accounts/user/leave/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then(() => {
          localStorage.removeItem("accessToken");
          alert("그동안 이용해주셔서 감사합니다.");
          logoutHandler();
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    } else {
      return;
    }
  };

  return (
    <div className="deleteMemberContainer">
      <div className="deleteMemberBox">
        <button className="deleteMemberBtn" onClick={handleDeleteProfile}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
}

export default Deletemember;
