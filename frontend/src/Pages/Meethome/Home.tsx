import { AiOutlineMore } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import "./Home.css";
import HomeMember from "./HomeMember";
import ScheduleBox from "./ScheduleBox";

function Home({
  getData,
  memberCount,
  feedData,
  scheduleData,
}: {
  getData: any;
  memberCount: number;
  feedData: any;
  scheduleData: any;
}) {
  const { id } = useParams();

  function getDaysAgo(created_at: string) {
    const now = new Date(); // 현재 시간
    const createdAtDate = new Date(created_at); // 게시물 작성 시간

    const diffTime = Math.abs(now.getTime() - createdAtDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }
  function returnLimitedFeed(feedData) {
    if (feedData.length === 0) {
      return [];
    } else if (feedData.length === 1) {
      return [feedData[0]];
    } else if (feedData.length === 2) {
      return [feedData[0], feedData[1]];
    } else {
      return [feedData[0], feedData[1], feedData[2]];
    }
  }

  function returnLimitedSchedules(scheduleData) {
    if (!scheduleData.results || scheduleData.results.length === 0) {
      return [];
    } else if (scheduleData.results.length === 1) {
      return [scheduleData.results[0]];
    } else if (scheduleData.results.length === 2) {
      return [scheduleData.results[0], scheduleData.results[1]];
    } else {
      return [
        scheduleData.results[0],
        scheduleData.results[1],
        scheduleData.results[2],
      ];
    }
  }

  return (
    <div className="meetingHomeScreen">
      <div className="meetingIntroBox">
        <h3 className="introTitle">소개</h3>
        <div className="meetIntroduce">{getData.description}</div>
      </div>
      <div>
        <div>
          <h4>게시판</h4>
          <div>
            {/* 게시물이 없을 때의 표시 */}
            {feedData.results && feedData.results.length === 0 && (
              <>
                <div className="noNotice">
                  <div className="noPostMessage">게시물이 없습니다.</div>
                </div>
              </>
            )}
            {/* 게시물이 있을 때의 표시 */}
            {feedData.results && feedData.results.length > 0 && (
              <>
                {returnLimitedFeed(feedData.results).map((item, index) => (
                  <Link
                    to={`/feedScreen/${id}/${item.id}`}
                    className="noticeBoardBox"
                    key={index}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    <div className="writerBox">
                      <div className="writerInfo">
                        {item.writer_image ? (
                          <img
                            className="writerPicture"
                            src={item.writer_image}
                            width={46}
                          />
                        ) : (
                          <img
                            className="noWriterPicture"
                            src={import.meta.env.VITE_PROFILE}
                            alt="프로필 이미지"
                          />
                        )}
                        <div className="userFeedInfo">
                          <div>{item.writer}</div>
                          <ul className="divisionInfo">
                            <li>{getDaysAgo(item.created_at)}일 전</li>
                            <li>자유게시판</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <button className="deleteIcon">
                          <AiOutlineMore size={23} style={{ color: "#000" }} />
                        </button>
                      </div>
                    </div>
                    <div className="joinerFeedBox">{item.content}</div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h4>일정</h4>
            {returnLimitedSchedules(scheduleData).length === 0 ? (
              <div className="noScheduleContainer">일정이 없습니다.</div>
            ) : (
              returnLimitedSchedules(scheduleData).map((item, index) => (
                <ScheduleBox key={index} item={item} />
              ))
            )}
          </div>
          <div>
            <hr />
            <div>
              <h4>멤버 {memberCount}</h4>
            </div>
            <HomeMember />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
