import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import "./Home.css";
import ScheduleBox from "./ScheduleBox";

function Home({
  button,
  getData,
  memberCount,
  feedData,
  scheduleData,
}: {
  button: React.ReactNode;
  getData: any;
  memberCount: number;
  feedData: any;
  scheduleData: any;
}) {
  const [showNoticeBoard, setShowNoticeBoard] = useState<boolean>(true);

  // 조건문 밖에서 상태 변경
  // useEffect(() => {
  //   if (!feedData || !feedData.results || feedData.results.length === 0) {
  //     setShowNoticeBoard(false);
  //   }
  // }, [feedData]);

  const latestSchedules = scheduleData.results?.slice(0, 2) || [];

  const lastElement = feedData.results?.[0]?.content || "";
  const secondLastElement = feedData.results?.[1]?.content || "";
  const lastWriter = feedData.results?.[0]?.writer || "";
  const secondLastWriter = feedData.results?.[1]?.writer || "";

  return (
    <div className="meetingHomeScreen">
      <div className="meetingIntroBox">
        <h3 className="introTitle">소개</h3>
        <div className="meetIntroduce">{getData.description}</div>
      </div>
      <div>
        <div>
          <h4>게시판 1</h4>
          <div>
            {/* 게시물이 없을 때의 표시 */}
            {feedData.results && feedData.results.length === 0 && (
              <>
                <div className="noticeBoardBox">
                  <div className="noPostMessage">게시물이 없습니다.</div>
                </div>
              </>
            )}
            {/* 게시물이 있을 때의 표시 */}
            {feedData.results && feedData.results.length > 0 && (
              <>
                <div className="noticeBoardBox">
                  <div className="writerBox">
                    <div className="writerInfo">
                      <img
                        className="writerPicture"
                        src="https://api.nudge-community.com/attachments/35176"
                        width={46}
                      />
                      <div className="userFeedInfo">
                        <div>{lastWriter}</div>
                        <ul className="divisionInfo">
                          <li>1일전</li>
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
                  <div className="joinerFeedBox">{lastElement}</div>
                </div>

                <div className="noticeBoardBox">
                  <div className="writerBox">
                    <div className="writerInfo">
                      <img
                        className="writerPicture"
                        src="https://api.nudge-community.com/attachments/35176"
                        width={46}
                      />
                      <div className="userFeedInfo">
                        <div>{secondLastWriter}</div>
                        <ul className="divisionInfo">
                          <li>1일전</li>
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
                  <div className="joinerFeedBox">{secondLastElement}</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <div>
            <h4>일정 1</h4>

            {/* 최신 2개의 일정에 대한 ScheduleBox 생성 */}
            {latestSchedules.map((item, index) => (
              <ScheduleBox key={index} item={item} />
            ))}
          </div>
          <div>
            <div>
              <h4>멤버 {memberCount}</h4>
            </div>
            멤버 목록
          </div>
          {button}
        </div>
      </div>
    </div>
  );
}
export default Home;
