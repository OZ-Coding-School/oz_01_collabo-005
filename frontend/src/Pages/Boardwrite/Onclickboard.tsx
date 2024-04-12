import React, { useState } from "react";

function OnClickBoard() {
  const handleImgChange = (e) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();
    const [postImg, setPostImg] = useState<string | null>(null);

    reader.onloadend = () => {
      if (reader.result) {
        setPostImg(reader.result as any);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="OnClickBoardContainer">
      <form action="">
        <input
          className="boardTitle"
          type="text"
          placeholder="제목을 입력해주세요"
        />
        <div className="textareaBox">
          <textarea
            name=""
            id=""
            cols={80}
            rows={30}
            placeholder="글을 입력해주세요"
          ></textarea>
        </div>
        <div className="submitBox">
          <input type="file" onChange={handleImgChange} />
          <input type="submit" value={"작성완료"} />
        </div>
      </form>
    </div>
  );
}

export default OnClickBoard;
