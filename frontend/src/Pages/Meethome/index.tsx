import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import TabButton from "../Mymeet/TabButton";
import Album from "./Album";
import Home from "./Home";
import NoticeBoard from "./NoticeBoard";
import Schedule from "./Schedule";
import "./index.css";

function MeetHome() {
  const [selectedTab, setSelectedTab] = useState<string>("홈"); // 추가

  function handleClick(selectedButton: string) {
    setSelectedTab(selectedButton); // 클릭된 버튼의 내용으로 상태 업데이트
  }
  let icon;
  if (
    selectedTab === "홈" ||
    selectedTab === "게시판" ||
    selectedTab === "앨범"
  ) {
    icon = (
      <div className="createPost">
        <button className="createPostBtn">
          <BsPencil size={25} style={{ color: "#ffffff" }} />
        </button>
      </div>
    );
  } else {
    icon = null;
  }
  return (
    <div className="meetScreenContainer">
      <div className="repMeetImgBox">
        <img
          src="https://image.dongascience.com/Photo/2023/07/dc552633578cd8779eebb1672efc76e7.jpg"
          alt="모임대표이미지"
          width={700}
        />
      </div>
      <div className="changePageIconBox">
        <div className="meetHomeIcons">
          <button className="personIconBtn">
            <HiUsers size={23} style={{ color: "#000" }} />
          </button>
          <button className="meetOutBtn">
            <IoSettingsOutline size={23} style={{ color: "#000" }} />
          </button>
        </div>
      </div>
      <div className="nameOfMeeting">
        <h3 className="meetingTitleName">세종 개발 스터디 모임</h3>
      </div>
      <div className="aboutUserNumber">
        <span>멤버</span>
        <span>18</span>
        <span>게시글</span>
        <span>29</span>
        <span>일정</span>
        <span>15</span>
      </div>
      <div className="tabs">
        <TabButton title="홈" onSelect={() => handleClick("홈")} />
        <TabButton title="게시판" onSelect={() => handleClick("게시판")} />
        <TabButton title="일정" onSelect={() => handleClick("일정")} />
        <TabButton title="앨범" onSelect={() => handleClick("앨범")} />
      </div>
      {selectedTab === "홈" && <Home button={icon} />}
      {selectedTab === "게시판" && <NoticeBoard button={icon} />}
      {selectedTab === "일정" && <Schedule />}
      {selectedTab === "앨범" && <Album button={icon} />}
    </div>
  );
}

export default MeetHome;
