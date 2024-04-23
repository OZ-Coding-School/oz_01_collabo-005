import "./Home.css";
import NoticeBox from "./NoticeBox";
import ScheduleBox from "./ScheduleBox";

function Home({
  button,
  getData,
  memberCount,
  feedData,
}: {
  button: React.ReactNode;
  getData: any;
  memberCount: number;
  feedData: any;
}) {
  return (
    <div className="meetingHomeScreen">
      <div className="meetingIntroBox">
        <h3 className="introTitle">소개</h3>
        <div className="meetIntroduce">{getData.description}</div>
      </div>
      <div>
        <div>
          <h4>게시판 1</h4>
        </div>
        <NoticeBox feedData={feedData} />
      </div>
      <div>
        <div>
          <h4>일정 1</h4>
        </div>
        <ScheduleBox />
      </div>
      <div>
        <div>
          <h4>멤버 {memberCount}</h4>
        </div>
        멤버 목록
      </div>
      {button}
    </div>
  );
}
export default Home;
