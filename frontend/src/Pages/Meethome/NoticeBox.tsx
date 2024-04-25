import { AiOutlineMore } from "react-icons/ai";

function NoticeBox({ result }) {
  return (
    <div className="coverNoticeBox">
      <div className="noticeBoardBox">
        <div className="writerBox">
          <div className="writerInfo">
            <img
              className="writerPicture"
              src="https://api.nudge-community.com/attachments/35176"
              width={46}
            />
            <div className="userFeedInfo">
              <div>{result.writer}</div>
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
          <div className="feedBoxContent">{result.content}</div>
          {result.image && (
            <div>
              <img src={result.image} width={200} height={200} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default NoticeBox;
