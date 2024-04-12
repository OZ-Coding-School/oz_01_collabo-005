import "./index.css";
import OnClickBoard from "./Onclickboard";

function WriteBoard() {
  return (
    <div className="writeBoardContainer">
      <div className="beforeText">
        <div className="writeBoardImgBox">
          <img src="./pictures/Main/ex0.jpeg" alt="" />
        </div>
        <div className="textBox">
          <div className="userName">이름</div>
        </div>
      </div>
      <OnClickBoard />
    </div>
  );
}

export default WriteBoard;
