import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { HiUsers } from "react-icons/hi";
import { MdRemoveRedEye } from "react-icons/md";
import dummy from "./dummy.json";
import "./index.css";
function ShowMyMeet() {
  return (
    <>
      {dummy.img.map((item, index) => (
        <div className="myMeetBox" key={index}>
          <img
            src={item.url}
            width={69}
            className="meetPicture"
            alt={item.title}
          />
          <p>{item.title}</p>
        </div>
      ))}
    </>
  );
}
function ShowMyFeed() {
  return (
    <div className="FeedArticleBox">
      {dummy.img.map(
        (
          item,
          index, // dummy 데이터를 map 함수로 순회합니다.
        ) => (
          <div key={index} className="feedBox">
            <div className="feedSource">
              <img
                src={item.url} // dummy 데이터의 이미지 URL을 사용합니다.
                width={51}
                height={51}
                className="meetPicture"
              />
              <div className="feedInfo">
                <h6>{item.title}</h6> {/* dummy 데이터의 제목을 사용합니다. */}
                <span>작성자</span> <span>작성일시</span>
              </div>{" "}
            </div>
            <div className="FeedWriting">
              <p>안녕하세요 잘 부탁드립니다</p>{" "}
              {/* dummy 데이터의 내용을 사용합니다. */}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function ShowMySchedule() {
  return (
    <>
      {dummy.img.map(
        (
          item,
          index, // dummy 데이터를 map 함수로 순회합니다.
        ) => (
          <div key={index} className="showMySchedule">
            <img
              src={item.url}
              width={80}
              height={80}
              className="meetPicture"
            />
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
        ),
      )}
    </>
  );
}
function Meet() {
  console.log(dummy);
  return (
    <div className="meet">
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="나의 일정">
          <ShowMySchedule />
        </Tab>
        <Tab eventKey="profile" title="나의 모임">
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
        </Tab>
      </Tabs>
    </div>
  );
}

export default Meet;
