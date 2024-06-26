import { useNavigate, useParams } from "react-router-dom";

import "./Schedule.css";
import ScheduleBox from "./ScheduleBox";

function Schedule({ scheduleData }) {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleMovePage() {
    navigate(`/createSchedules/${id}`);
  }

  if (
    !scheduleData ||
    !Array.isArray(scheduleData.results) ||
    scheduleData.results.length === 0
  ) {
    return (
      <>
        <div className="noSchedule">일정이 없습니다.</div>
        <div className="noneScheduleCreate">
          <button className="scheduleBtn" onClick={handleMovePage}>
            <span>➕</span> 일정 만들기
          </button>
        </div>
      </>
    );
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
      {scheduleData.results.map((item, index) => (
        <ScheduleBox key={index} item={item} />
      ))}
    </div>
  );
}
export default Schedule;
