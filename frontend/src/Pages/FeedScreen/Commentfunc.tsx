import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import "./Commentfunc.css";

function CommentFunc() {
  //1.인풋창 만들기 , 인풋창 만들어서 전송하기
  //2.전송된 댓글 반환하기
  //좋아요 같은 부가기능 있는 거 나중에 해보기

  const { id, postId } = useParams();
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState("");
  const [writtenComments, setWrittenComments] = useState("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
    window.scrollTo(0, 0);
  }, []);
  // console.log(writtenComments);

  //댓글입력 핸들러
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  //서버에 댓글 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await instance.get(
        `api/clubs/${id}/posts/${postId}/comments/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setWrittenComments(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  //댓글 보내는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(
        `api/clubs/${id}/posts/${postId}/comments/`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setComment(""); // 댓글 입력란 초기화
      alert("댓글이 등록되었습니다.");
      navigate(``);
    } catch (error) {
      alert("글작성 실패");
      console.log(error);
    }
  };

  //댓글 수정함수
  const handleEdit = async () => {
    try {
      const response = await instance.put(
        `/api/clubs/${id}/posts/${postId}/comments`,
      );
    } catch {}
  };

  return (
    <>
      <div className="numberOfEvent">
        <FaRegComment className="FeedCommentIcon" />
        <div>{commentCount}</div>
      </div>
      <div className="containComments">
        {Array.isArray(writtenComments) &&
          writtenComments.map((comment, index) => (
            <div
              key={index}
              className="landingUserBox"
              style={{ paddingTop: "30px" }}
            >
              <div className="webUserInfo">
                <div className="landingUserImg">
                  <img
                    src={import.meta.env.VITE_PROFILE}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="wrapWrittenBox">
                  <div className="writtenBox"></div>
                  <p>{comment.user}</p>
                </div>
              </div>
              <p>{comment.content}</p>

              <div className="commentChangeIcons">
                <p>{comment.created_at.slice(0, 16)}</p>
                <button>
                  <LuPencilLine />
                </button>
                <button>
                  <CiCircleCheck />
                </button>
                <button>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div id="commentCreate">
        <form className="commentForm" onSubmit={handleSubmit}>
          <input
            id="commentInput"
            placeholder="댓글을 입력하세요."
            type="text"
            value={comment}
            onChange={handleCommentChange}
          />

          {/* <IoMdSend size={20} type="submit" /> */}
          <button type="submit">
            <IoMdSend size={20} />
          </button>
        </form>
      </div>
    </>
  );
}

export default CommentFunc;
