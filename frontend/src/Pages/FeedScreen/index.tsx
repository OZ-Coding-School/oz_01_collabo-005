import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { GrLike } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import "./CommentList.css";
import WriterInfo from "./WriterInfo";
import "./index.css";

function FeedScreen() {
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState([
    {
      id: 1, //고유한 값이어야 한다.
      text: "다음주에 놀러오세요~",
    },
  ]);
  const [isEdit, setIsEdit] = useState(true);
  const [commentEdit, SetCommentEdit] = useState("");
  function commentInput(event) {
    setComment(event.target.value);
  }

  function commentSubmit(event) {
    event.preventDefault();
    const newComment = {
      id: Date.now(), // 각 댓글마다 고유한 ID를 부여 (현재 시간을 사용)
      text: comment,
    };
    setAddComment([...addComment, newComment]);
    setComment("");
  }
  function handleEditClick() {
    setIsEdit(false);
  }
  function handleEditSave() {
    const updateComment = addComment.map((item) => {
      if (item.id === 댓글.id) {
        return {
          ...item,
          text: commentEdit,
        };
      }
      return item;
    });
    setAddComment(updateComment);
    setIsEdit(true);
  }
  function handleDelete() {}

  function handleEdit(e) {
    SetCommentEdit(e.target.value);
  }
  return (
    <>
      <div className="feedScreenTopNav">
        <div className="goBackBtn">
          <IoArrowBack size={27} /> {/*뒤로가기 버튼*/}
        </div>
        <div className="designationClub">
          <h2>영어 스피킹 클럽</h2> {/*모임 이름*/}
        </div>
      </div>{" "}
      {/*게시판 화면 탑 네브*/}
      <div className="postScreen">
        {/*피드 화면 */}
        <div className="conCreateFeedBox">
          <WriterInfo paddingTop="0px" />
          <div className="landingFeedBox">
            <p>영어를 잘하고 싶어요 </p>
            <img
              src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/GBi/image/d-f6foyahXjbkCfjFdq7IeiwVvM"
              height={300}
            />
            <div className="numberOfEvent">
              <span>댓글 2</span>

              <span>조회 3</span>
            </div>
            <div className="usersActionBtn">
              <div className="iconsDetectAction">
                <GrLike size={25} />
                <BsChat size={25} />
              </div>
              <div>
                <button className="feedLikesBtn">
                  <AiOutlineLike className="likeButton" />
                </button>{" "}
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
        <div className="containComments">
          {addComment.map((댓글) => (
            <>
              <WriterInfo paddingTop="20px" />
              <div className="personsComment">
                {isEdit ? (
                  <div className="feedComment">{댓글.text}</div>
                ) : (
                  <input
                    type="text"
                    value={commentEdit}
                    onChange={handleEdit}
                  />
                )}
                <div className="commentChangeIcons">
                  <button onClick={isEdit ? handleEditClick : handleEditSave}>
                    <LuPencilLine />
                  </button>
                  <button onClick={handleDelete}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
        <div id="commentCreate">
          <form className="commentForm" onSubmit={commentSubmit}>
            <input
              id="commentInput"
              placeholder="댓글을 입력하세요."
              type="text"
              value={comment}
              onChange={commentInput}
            />
            <button id="sendComment">
              <IoMdSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedScreen;
