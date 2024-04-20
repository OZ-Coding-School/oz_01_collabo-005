import { HiUsers } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";

function ScheduleBox() {
  return (
    <div className="meetingScheduleBox">
      <div className="scheduleDate">
        <span className="scheduleMonth">12월</span>
        <span>7일</span>
      </div>
      <div className="specificInfo">
        <div className="scheduleName">
          <h4>세종 개발 스터디 정모</h4>
        </div>
        <div className="recruitmentStatus">모집중</div>
        <div className="aboutScheduleNumber">
          <div>
            <MdAccessTimeFilled />
            오후 07:30
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
