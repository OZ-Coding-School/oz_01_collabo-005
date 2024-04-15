import { useState } from "react";
import "./index.css";

function CreateBoard() {
  return (
    <div className="writeBoardContainer">
      <div className="OnClickBoardContainer">
        <form action="" className="boardForm">
          <div className="beforeText">
            <div className="writeBoardImgBox">
              <img src="./pictures/Main/ex0.jpeg" alt="" />
            </div>
            <div className="topTitleBox">
              <div className="boardUserName">이름</div>
              <input
                className="boardTitle"
                type="text"
                placeholder="제목을 입력해주세요"
                name="board-title"
              />
            </div>
          </div>
          <div className="textareaBox">
            <textarea
              name="board-detail"
              id=""
              placeholder="글을 입력해주세요"
            ></textarea>
          </div>

          <div className="schedulesSubmitContainer">
            <div className="submitBox">
              <input type="file" />
              <input type="submit" value={"작성완료"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoard;
