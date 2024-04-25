import { HiUsers } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";

function ScheduleBox({ item }: { item: any }) {
  // "created_at" 속성을 통해 날짜를 만듭니다.
  const eventDate = new Date(item.event_time);

  // 날짜에서 월과 일을 가져옵니다.
  const month = eventDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = eventDate.getDate();

  return (
    <div className="meetingScheduleBox">
      <div className="scheduleDate">
        <span className="scheduleMonth">{month}월</span>
        <span>{day}일</span>
      </div>
      <div className="specificInfo">
        <div className="scheduleName">
          <h4>{item.content}</h4>
        </div>
        <div className="recruitmentStatus">모집중</div>
        <div className="aboutScheduleNumber">
          <div>
            <MdAccessTimeFilled /> 몇시에 모일지
          </div>
          <div>
            <HiUsers /> 6/10명
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBox;
