import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import instance from "../Apis/axios";
import UserContext from "../Context/Authuser";
import "./Topnav.css";

function TopNav(): JSX.Element {
  const { userInfo, setUserInfo }: any = useContext(UserContext);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(
    userInfo?.accessToken ? true : false,
  );

  //로그인 , 로그아웃 기능
  useEffect(() => {
    userInfo == null ? setIsLogin(false) : setIsLogin(true);
  }, [userInfo]);

  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  const logoutHandler = () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      instance.post("api/accounts/logout/", { refresh: refresh });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("first_name");
      localStorage.removeItem("last_name");
      localStorage.removeItem("pk");
      setUserInfo(null); // 로그아웃 후에 상태를 업데이트하여 다시 렌더링되도록 합니다.
      alert("로그아웃 되었습니다.");
    } catch {
      console.error("로그아웃 중 에러발생");
      alert("로그아웃에 실패했습니다");
    }
  };

  return (
    <div className="topNavContainer">
      <div className="headerBox">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="Logo">LANDING</div>
        </Link>
        <div className="navbarButtonBox">
          {/* {showSearch && (
            <form className="searchScreen">
              <label className="searchInputLabel">
                <input
                  className="searchInput"
                  type="text"
                  placeholder="어떤 모임을 찾으시나요?"
                />
                <button type="submit" className="inScreenSearch">
                  <FiSearch />
                </button>
              </label>
            </form>
          )} */}
          <div className="navMenuIcon">
            {/* <button className="searchButton" onClick={toggleSearch}>
              {showSearch ? <RxCross1 size={27} /> : <FiSearch size={27} />}
            </button> */}

            <label className="dropdownLabel" onClick={toggleMenu}>
              <FaUser className="userIcon" />
              <FaAngleDown className="caretIcon" />
            </label>
            <div className={showMenu ? "aboutMyMenuHidden" : "myMenuList"}>
              <ul className="menuList">
                {isLogin ? (
                  <>
                    <li className="logoutList">
                      <button className="logoutButton" onClick={logoutHandler}>
                        로그아웃
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="loginList">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        로그인
                      </Link>
                    </li>
                  </>
                )}
                <li className="myInfoList">
                  <Link
                    to="/myInfo"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    나의정보
                  </Link>
                </li>
                <li className="myMeetList">
                  <Link
                    to="/myMeet"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    나의모임
                  </Link>
                </li>
              </ul>
            </div>

            <Link to="/createMeet">
              <button>➕</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
