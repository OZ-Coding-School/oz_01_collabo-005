import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import TabButton from "../Mymeet/TabButton";
import Album from "./Album";
import Home from "./Home";
import NoticeBoard from "./NoticeBoard";
import Schedule from "./Schedule";
import "./index.css";

function MeetHome() {
  const [getData, setGetData]: any = useState([]);

  const { id }: any = useParams();

  useEffect(() => {
    async function getImage() {
      try {
        const response = await instance.get(`api/clubs/${id}`);
        setGetData(response.data);
      } catch (error) {
        console.error("error", error);
      }
    }
    getImage();
    console.log(getData);
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>("홈"); // 추가

  function handleClick(selectedButton: string) {
    setSelectedTab(selectedButton); // 클릭된 버튼의 내용으로 상태 업데이트
  }
  const navigate = useNavigate();

  function handleShowMemberList() {
    // MemberList 페이지로 이동
    navigate(`/clubs/${id}/members`);
  }

  function handleCreateFeed() {
    navigate("/createboard");
  }
  const handleJoinClub = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    try {
      const response = await instance.post(
        `api/clubs/${id}/join`,

        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      alert("모임에 가입되었습니다.");
      console.log(response.data);
    } catch (error) {
      console.error("Error joining club:", error);
      alert("모임 가입에 실패했습니다.");
    }
  };

  let icon;
  if (
    selectedTab === "홈" ||
    selectedTab === "게시판" ||
    selectedTab === "앨범"
  ) {
    icon = (
      <div className="createPost">
        <button className="createPostBtn">
          <BsPencil
            size={25}
            style={{ color: "#ffffff" }}
            onClick={handleCreateFeed}
          />
        </button>
      </div>
    );
  } else {
    icon = null;
  }
  return (
    <div className="meetScreenContainer">
      <div className="repMeetImgBox">
        <img src={getData.image} alt="모임대표이미지" width={700} />
      </div>
      <div className="changePageIconBox">
        <div className="meetHomeIcons">
          <button className="personIconBtn" onClick={handleShowMemberList}>
            <HiUsers size={23} style={{ color: "#000" }} />
          </button>
          <button className="meetOutBtn">
            <IoSettingsOutline size={23} style={{ color: "#000" }} />
          </button>
        </div>
      </div>
      <div className="nameOfMeeting">
        <h3 className="meetingTitleName">{getData.name}</h3>
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
      {selectedTab === "홈" && <Home button={icon} getData={getData} />}
      {selectedTab === "게시판" && <NoticeBoard button={icon} />}
      {selectedTab === "일정" && <Schedule />}
      {selectedTab === "앨범" && <Album button={icon} />}
      <form className="enterMeet" onSubmit={handleJoinClub}>
        <input type="submit" className="submit" value={"모임 가입"} />
      </form>
    </div>
  );
}

export default MeetHome;
