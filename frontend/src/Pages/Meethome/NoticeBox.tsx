import { AiOutlineMore } from "react-icons/ai";

function NoticeBox() {
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
      <div className="joinerFeedBox">
        안녕하세요 개발자 분들과 소통하고 싶어서 들어왔습니다.
      </div>
    </div>
  );
}
export default NoticeBox;
