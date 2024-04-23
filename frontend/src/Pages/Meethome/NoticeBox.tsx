import { AiOutlineMore } from "react-icons/ai";

function NoticeBox({ feedData }) {
  // feedData가 존재하고 results 배열에 요소가 있는지 확인
  if (!feedData || !feedData.results || feedData.results.length === 0) {
    return null; // 에러를 방지하기 위해 null을 반환하거나 다른 처리를 수행할 수 있습니다.
  }

  const string = feedData.results[0].content;

  return (
    <div className="noticeBoardBox">
      <div className="writerBox">
        <div className="writerInfo">
          <img
            className="writerPicture"
            src="https://api.nudge-community.com/attachments/35176"
            width={46}
          />
          <div className="userFeedInfo">
            <div>포디</div>
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
      <div className="joinerFeedBox">{string}</div>
    </div>
  );
}
export default NoticeBox;
