import { AiOutlineMore } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

function NoticeBox({ result }) {
  let { id } = useParams();

  // 게시물 작성 날짜를 받아서 몇 일 전에 작성되었는지 계산하는 함수
  function getDaysAgo(created_at) {
    const now = new Date(); // 현재 시간
    const createdAtDate = new Date(created_at); // 게시물 작성 시간

    const diffTime = Math.abs(now.getTime() - createdAtDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  return (
    <Link
      to={`/feedScreen/${id}/${result.id}`}
      className="coverNoticeBox"
      style={{ color: "#000", textDecoration: "none" }}
    >
      <div className="noticeBoardBox">
        <div className="writerBox">
          <div className="writerInfo">
            {result.writer_image ? (
              <img
                className="writerPicture"
                src={result.writer_image}
                width={46}
              />
            ) : (
              <img
                className="noneWriterPicture"
                src={import.meta.env.VITE_PROFILE}
                alt="프로필 이미지"
              />
            )}

            <div className="userFeedInfo">
              <div>{result.writer}</div>
              {/* 작성 시간을 표시 */}
              <ul className="divisionInfo">
                <li>{getDaysAgo(result.created_at)}일 전</li>
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
    </Link>
  );
}

export default NoticeBox;
