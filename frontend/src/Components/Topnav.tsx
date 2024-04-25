import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

  // Ref를 사용하여 메뉴 아이콘 영역과 메뉴 영역을 참조합니다.
  const menuIconRef = useRef<HTMLLabelElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // document에 클릭 이벤트를 추가합니다.
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 메뉴 영역 외부를 클릭했을 때 메뉴를 닫습니다.
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      menuIconRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !menuIconRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };
  const toggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  //로그인 , 로그아웃 기능
  useEffect(() => {
    userInfo == null ? setIsLogin(false) : setIsLogin(true);
  }, [userInfo]);

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

            <label
              className="dropdownLabel"
              onClick={toggleMenu}
              ref={menuIconRef}
            >
              <StyleFaUser />
              {/* <FaUser className="userIcon" /> */}
              {/* <StyleFaAngleDown /> */}
              {/* <FaAngleDown className="caretIcon" /> */}
            </label>
            <div
              className={showMenu ? "aboutMyMenuHidden" : "myMenuList"}
              ref={menuRef}
            >
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
                <li>
                  <Link
                    to="/createMeet"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    모임 개설하기
                  </Link>
                </li>
              </ul>
            </div>

            {/* <Link to="/createMeet">
              <button>➕</button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;

const StyleFaUser = styled(GiHamburgerMenu)`
  width: 26px;
  height: 26px;
  margin: 5px 0px 0 30px;
`;
