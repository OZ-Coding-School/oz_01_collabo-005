import { HiUsers } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";

function ScheduleBox({ item }: { item: any }) {
  // "created_at" 속성을 통해 날짜를 만듭니다.
  const eventDate = new Date(item.event_time);

  // 날짜에서 월과 일을 가져옵니다.
  const month = eventDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = eventDate.getDate();
  const countPeople = item.max_attendees;
  let hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();
  let ampm = "오전";

  // 오후인지 아닌지 확인하고 시간을 조정합니다.
  if (hours >= 12) {
    ampm = "오후";
    hours -= 12;
  }

  // 만약 시간이 0시(자정)이라면 12시로 변경합니다.
  if (hours === 0) {
    hours = 12;
  }

  return (
    <div className="meetingScheduleBox">
      <div className="scheduleDate">
        <span className="scheduleMonth">{month}월</span>
        <span>{day}일</span>
      </div>
      <div className="specificInfo">
        <div className="scheduleName">
          <h4>{item.title}</h4>
        </div>

        <div className="aboutScheduleNumber">
          <div>
            <MdAccessTimeFilled /> {ampm} {hours}시 {minutes}분
          </div>
          <div>
            <HiUsers /> 6/{countPeople}명
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBox;
