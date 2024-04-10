import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsPersonCircle } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Topnav.css";

function TopNav(): JSX.Element {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const toggleSearch = (): void => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="NavContainer">
      <div className="header-box">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          <div className="Logo">LANDING</div>{" "}
        </Link>
        <div className="navbar-button-box">
          {showSearch && (
            <form className="search-button">
              <label>
                <input
                  className="searchInput"
                  type="text"
                  placeholder="어떤 모임을 찾으시나요?"
                />
                <button type="submit" className="inScreen-search">
                  <FiSearch />
                </button>
              </label>
            </form>
          )}
          <div className="icon-container">
            <button className="search-button" onClick={toggleSearch}>
              {showSearch ? <RxCross1 size={27} /> : <FiSearch size={27} />}
            </button>
            <NavDropdown
              title={<BsPersonCircle size={27} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  로그인
                </Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Item>
                {" "}
                <Link to={"/myinfo"} style={{ textDecoration: "none" }}>
                  나의 정보
                </Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Item>
                {" "}
                <Link to={"/myMeet"} style={{ textDecoration: "none" }}>
                  나의 모임
                </Link>{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="createMeet">모임 개설</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
