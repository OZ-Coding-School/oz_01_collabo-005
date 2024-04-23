import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { GrLike } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

import WriterInfo from "./WriterInfo";
import "./index.css";

function FeedScreen() {
  const [addComment, setAddComment] = useState("");
  const [commentList, setCommentList] = useState([
    {
      id: 1, //고유한 값이어야 한다.
      text: "다음주에 놀러오세요~",
    },
  ]);
  const [updateText, setUpdateText] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeCount() {
    setLikeCount(likeCount + 1);
  }
  function handleAddComment(e) {
    setAddComment(e.target.value);
  }
  function handelCreateComment(e) {
    e.preventDefault();
    const newComment = {
      id: Date.now(), // 각 댓글마다 고유한 ID를 부여 (현재 시간을 사용)
      text: addComment,
    };
    setCommentList([...commentList, newComment]);
    setAddComment("");
  }
  function handleEditComment(commentId) {
    setIsEdit(true); // 수정 모드를 활성화합니다.
    setEditCommentId(commentId); // 수정 중인 댓글의 ID를 설정합니다.
  }
  function handleSaveComment() {
    // 수정한 내용을 저장하는 로직
    const updatedCommentList = commentList.map((comment) => {
      if (comment.id === editCommentId) {
        // 현재 수정 중인 댓글의 ID를 나타내며, 이 값과 현재 순회 중인 댓글의 ID가 같은지를 확인한다.
        return { ...comment, text: updateText || comment.text }; //같으면 해당 댓글을 복사하고, text만 업데이트한다.  수정된 텍스트가 없으면 기존 텍스트를 유지하도록 변경
      }
      return comment; // 현재 수정 중인 댓글의 ID와 현재 순회 중인 댓글 ID가 다른 댓글은 그대로 밷어낸다.
    });
    setCommentList(updatedCommentList);
    setIsEdit(false); // 수정 모드 종료
    setEditCommentId(null); // 수정 중인 댓글 ID 초기화
    setUpdateText("");
  }

  function handleDeleteComment(commentId) {
    const updatedCommentList = commentList.filter(
      (comment) => comment.id !== commentId,
    );
    setCommentList(updatedCommentList);
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
                <button className="feedLikesBtn" onClick={handleLikeCount}>
                  <AiOutlineLike className="likeButton" />
                </button>{" "}
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="containComments">
          {commentList.map((item) => (
            <React.Fragment key={item.id}>
              <div className="landingUserBox" style={{ paddingTop: "30px" }}>
                <div className="webUserInfo">
                  <div className="landingUserImg">
                    <img
                      src="https://i.namu.wiki/i/G9ey-HFAbimbOE7iEYs-GQ108GtySNix3H9BD-YvPqcHYyIahrNxqamCqhYLsEl_2ws9HkZMXB5-N0Lg2nDtWchO9HeD0EDvOceVvq5ufBmVKWUM5oYMmM7lMF5UsJ_bP2mX_1pf4vHmweTVwe_bbA.webp"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="wrapWrittenBox">
                    <div className="writtenBox">
                      <p>userName</p>
                    </div>
                    <div>
                      <span>작성일</span>
                    </div>
                  </div>{" "}
                </div>
              </div>{" "}
              <div className="personsComment">
                {isEdit && item.id === editCommentId ? (
                  <input
                    type="text"
                    value={updateText || item.text}
                    onChange={(event) => setUpdateText(event.target.value)}
                  />
                ) : (
                  <div className="feedComment" key={item.id}>
                    {item.text}
                  </div>
                )}

                <div className="commentChangeIcons">
                  <button onClick={() => handleEditComment(item.id)}>
                    <LuPencilLine />
                  </button>
                  <button onClick={handleSaveComment}>
                    <CiCircleCheck />
                  </button>
                  <button onClick={() => handleDeleteComment(item.id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div id="commentCreate">
          <form className="commentForm">
            <input
              id="commentInput"
              placeholder="댓글을 입력하세요."
              type="text"
              value={addComment}
              onChange={handleAddComment}
            />
            <button id="sendComment" onClick={handelCreateComment}>
              <IoMdSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedScreen;
