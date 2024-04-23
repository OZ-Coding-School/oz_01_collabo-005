import { useNavigate, useParams } from "react-router-dom";
import "./Schedule.css";
import ScheduleBox from "./ScheduleBox";

function Schedule() {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleMovePage() {
    navigate(`/createschedules/${id}`);
  }

  return (
    <div className="wrapScheduleBox">
      <div className="scheduleBox">
        <div className="makingScheduleBox">
          <button className="createMeetingSchedule" onClick={handleMovePage}>
            <span>➕</span> 일정 만들기
          </button>
        </div>
        <div></div>{" "}
      </div>{" "}
      <div className="divisionScheduleBox">
        <div className="expectedSchedule">
          <button className="expectScheduleBtn">예정된 일정</button>
        </div>
        <div className="closedSchedule">
          <button className="closeScheduleBtn">종료된 일정</button>
        </div>
      </div>
      <ScheduleBox />
    </div>
  );
}
export default Schedule;
