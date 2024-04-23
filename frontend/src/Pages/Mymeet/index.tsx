import { useEffect, useState } from "react"; // 추가
import { HiUsers } from "react-icons/hi";
import { MdRemoveRedEye } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import TabButton from "./TabButton";
import dummy from "./dummy.json";
import "./index.css";

interface DummyItem {
  url: string;
  title: string;
}

type ClubInfo = {
  id: number;
  url: string | null;
  name: string | null;
  image: string | null;
};

type MyItems = {
  id: number | null;
  club: ClubInfo | null;
};

function ShowMyMeet(): JSX.Element {
  const [getData, setGetData] = useState([]);
  const [seeMyMeet, setSeeMyMeet]: any = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getMyMeet() {
      try {
        const response = await instance.get("/api/activities/clubs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // console.log(response.data);
        setSeeMyMeet(response.data.results);
      } catch (error) {
        console.log("error", error);
      }
    }
    getMyMeet();
  }, []);
  console.log(seeMyMeet, "시마이트미트");

  return (
    <>
      {Array.isArray(seeMyMeet) &&
        seeMyMeet.map((item, index) => (
          <div className="myMeetBox" key={index}>
            <Link to={`/meetHome/${item.club.id}`} className="">
              <img
                src={
                  item.club.image ? item.club.image : import.meta.env.VITE_ICON
                }
                className="meetPicture"
                // alt={item.name}
              />
              <p>{item.club.name}</p>
            </Link>
          </div>
        ))}
    </>
  );
}

function ShowMyFeed(): JSX.Element {
  return (
    <div className="FeedArticleBox">
      {dummy.img.map((item: DummyItem, index: number) => (
        <div key={index} className="feedBox">
          <div className="feedSource">
            <img
              src={item.url} // dummy 데이터의 이미지 URL을 사용합니다.
              width={51}
              height={51}
              className="meetPicture"
            />
            <div className="feedInfo">
              <h4 className="c">{item.title}</h4>{" "}
              {/* dummy 데이터의 제목을 사용합니다. */}
              <div className="articleInfo">
                {" "}
                <span>작성자</span> <span>작성일시</span>
              </div>
            </div>{" "}
          </div>
          <div className="FeedWriting">
            <p>안녕하세요 잘 부탁드립니다</p>{" "}
            {/* dummy 데이터의 내용을 사용합니다. */}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowMySchedule(): JSX.Element {
  return (
    <>
      {dummy.img.map((item: DummyItem, index: number) => (
        <div key={index} className="showMySchedule">
          <img src={item.url} width={80} height={80} className="meetPicture" />
          <div className="scheduleContainer">
            <div className="scheduleName">
              <h2>연희북클럽_세계문학 함께 읽기</h2>
            </div>
            <div className="scheduleInfo">
              <div className="scheduleTime">
                <span>오늘,</span> <span>오후 3:00</span>
              </div>
              <div className="relatedNumbers">
                <span>
                  <HiUsers />
                  6/25명
                </span>
                <span>
                  <MdRemoveRedEye />5
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
function MyMeet() {
  const [selectedTab, setSelectedTab] = useState<string>("일정"); // 추가

  function handleClick(selectedButton: string) {
    setSelectedTab(selectedButton); // 클릭된 버튼의 내용으로 상태 업데이트
  }

  // console.log(dummy);
  return (
    <div className="meet">
      <div className="tabs">
        <TabButton title="나의 일정" onSelect={() => handleClick("일정")} />
        <TabButton title="나의 모임" onSelect={() => handleClick("모임")} />
      </div>
      {selectedTab === "일정" && <ShowMySchedule />}
      {selectedTab === "모임" && (
        <div className="MyMFcontainer">
          <h4 className="titleMeet">나의 모임</h4>
          <div className="showMyMeet">
            <ShowMyMeet />
          </div>
          <div className="showMyFeed">
            <div className="feedTitleBox">
              <h4 className="titleFeed">피드</h4>
            </div>
            <ShowMyFeed />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyMeet;
