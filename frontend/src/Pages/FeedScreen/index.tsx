import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import CommentFunc from "./Commentfunc";
import "./index.css";

function FeedScreen() {
  const { id, postId } = useParams();
  const [writtenPost, setWrittenPost]: any = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBoard() {
      try {
        const response = await instance.get(
          `api/clubs/${id}/posts/${postId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        setWrittenPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getBoard();
  }, []);

  return (
    <>
      <div className="feedScreenTopNav">
        <div className="goBackBtn">
          <IoArrowBack
            size={27}
            onClick={() => {
              navigate(`/meetHome/${id}/`);
            }}
          />{" "}
          {/* 뒤로가기 버튼 */}
        </div>
        <div className="designationClub">
          <h2>{writtenPost.title}</h2>
        </div>
      </div>
      {/* 게시판 화면 탑 네브 */}
      <div className="postScreen">
        {/* 피드 화면 */}
        <div className="landingFeedBox">
          <div className="contentDateBox">
            <p>{writtenPost.content}</p>
            <div>
              {writtenPost && writtenPost.updated_at && (
                <>{writtenPost.updated_at.slice(0, 16)}</>
              )}
            </div>
          </div>
          <div className={writtenPost.image ? "" : "noShowImage"}>
            <img src={writtenPost.image} height={300} />
          </div>
        </div>
        <CommentFunc /> {/* CommentFunc 컴포넌트 위치 수정 */}
      </div>
    </>
  );
}

export default FeedScreen;
