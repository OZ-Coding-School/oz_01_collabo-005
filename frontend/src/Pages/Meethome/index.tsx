import { FormEvent, useEffect, useState } from "react";
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
  const [getCount, setGetCount]: any = useState([]);
  const [memberCount, setMemberCount] = useState<number>(0);
  const { id }: any = useParams();
  const [feedCount, setFeedCount] = useState();
  const [feedData, setFeedData] = useState([]);

  interface ScheduleData {
    results: Array<{
      // 결과 객체의 구조에 따라 필드를 추가합니다.
      // 예를 들어, "content"와 "date"라는 필드가 있다고 가정합니다.
      content: string;
      date: string;
      // 추가적인 필드가 있다면 여기에 추가합니다.
    }>;
    // 다른 필요한 속성이 있다면 여기에 추가합니다.
  }
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function getSchedule() {
      try {
        const response = await instance.get(`api/clubs/${id}/schedules/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setScheduleData(response.data);
        setFeedCount(response.data.count);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getSchedule();
  }, []); //일정  안불러와짐

  useEffect(() => {
    async function getFeed() {
      try {
        const response = await instance.get(`api/clubs/${id}/posts/`);
        setFeedData(response.data);
        // console.log(response.data); // 이 위치에 둬서 데이터가 업데이트된 후에 찍히도록 함
      } catch (error) {
        console.log("error", error);
      }
    }
    getFeed();
  }, []);

  useEffect(() => {
    async function getMember() {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      try {
        const response = await instance.get(`api/clubs/${id}/members/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setGetCount(response.data);
        setMemberCount(response.data.count);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
    getMember();
  }, [memberCount]); //멤버수 바뀔 때마다 재렌더링 되도록.

  useEffect(() => {
    async function getImage() {
      try {
        const response = await instance.get(`api/clubs/${id}/`);
        setGetData(response.data);
      } catch (error) {
        console.error("error", error);
      }
    }
    getImage();
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
    navigate(`/createboard/${id}`);
  }

  const handleJoinClub = async (e: FormEvent) => {
    // FormEvent 타입으로 변경
    e.preventDefault(); // 폼 제출 기본 동작 방지

    try {
      const response = await instance.post(
        `api/clubs/${id}/join/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      alert("모임에 가입되었습니다.");

      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        alert("이미 모임에 가입되어 있습니다."); // 이미 가입되어 있는 경우
      } else if (error.response && error.response.status === 400) {
        alert("모임 연령대와 맞지 않습니다");
      } else {
        console.error("Error joining club:", error);
        alert("모임 가입에 실패했습니다.");
      }
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
            onClick={handleCreateFeed} //버튼 클릭 -> 글쓰기 페이지로 이동
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
        <img
          src={getData.image ? getData.image : import.meta.env.VITE_ICON}
          alt="모임대표이미지"
          width={700}
        />
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
        <span>{memberCount}</span>
        <span>게시글</span>
        <span>{feedCount}</span>
        <span>일정</span>
        <span>15</span>
      </div>
      <div className="tabs">
        <TabButton title="홈" onSelect={() => handleClick("홈")} />
        <TabButton title="게시판" onSelect={() => handleClick("게시판")} />
        <TabButton title="일정" onSelect={() => handleClick("일정")} />
        <TabButton title="앨범" onSelect={() => handleClick("앨범")} />
      </div>
      {selectedTab === "홈" && (
        <Home
          button={icon}
          getData={getData}
          memberCount={memberCount}
          feedData={feedData}
          scheduleData={scheduleData}
        />
      )}
      {selectedTab === "게시판" && (
        <NoticeBoard button={icon} feedData={feedData} />
      )}
      {selectedTab === "일정" && <Schedule scheduleData={scheduleData} />}
      {selectedTab === "앨범" && <Album button={icon} />}
      <form className="enterMeet" onSubmit={handleJoinClub}>
        <input type="submit" className="submit" value={"모임 가입"} />
      </form>
    </div>
  );
}

export default MeetHome;
