import React from "react";
import { FiSearch } from "react-icons/fi";
import { SlMenu } from "react-icons/sl";
import "./Nav.css";

function Nav() {
  return (

    <div className="Nav-container">
      <div className="header-box">
        <div className="Logo">LOGO</div>
        <div className="navbar-button-box">
          <button className="search-button">
            <FiSearch size={30} />
          </button>{" "}
          <button onClick={() => console.log("버튼")} className="menu-button">
            <SlMenu size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
