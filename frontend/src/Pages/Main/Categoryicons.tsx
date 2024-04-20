import React, { useEffect } from "react";
import { FaMountain } from "react-icons/fa";
import { MdOutlineSportsHandball } from "react-icons/md";
import { GiInnerSelf } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiGame } from "react-icons/bi";
import { PiBabyBold } from "react-icons/pi";
import "./Categoryicons.css";

function CategoryBox() {
  useEffect(() => {});

  return (
    <div>
      <div className="categoryBox">
        <div className="iconContainer">
          <a href="/clubCategory/1/" className="iconBox">
            <MdOutlineSportsHandball className="icons" />
            <div>운동</div>
          </a>
          <a href="/clubCategory/2/" className="iconBox">
            <BiGame className="icons" />
            <div>취미/오락</div>
          </a>
          <a href="/clubCategory/3/" className="iconBox">
            <FaMountain className="icons" />
            <div>아웃도어</div>
          </a>
          <a href="/clubCategory/4/" className="iconBox family">
            <PiBabyBold className="icons" />
            <div>가족/육아</div>
          </a>
        </div>

        <div className="iconContainer">
          <a href="/clubCategory/5/" className="iconBox">
            <MdOutlineMenuBook className="icons" />
            <div>책/인문학</div>
          </a>
          <a href="/clubCategory/6/" className="iconBox">
            <HiMiniMusicalNote className="icons" />
            <div>음악/악기</div>
          </a>
          <a href="/clubCategory/7/" className="iconBox">
            <FaPeopleGroup className="icons" />
            <div>문화/예술</div>
          </a>
          <a href="/clubCategory/8/" className="iconBox selfDevelop">
            <GiInnerSelf className="icons" />
            <div>자기계발</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CategoryBox;
