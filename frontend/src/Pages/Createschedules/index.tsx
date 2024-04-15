import React, { useState } from "react";
import "./index.css";
import { MdDateRange } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

function CreateSchedules() {
  // const handleImgChange = (e) => {
  // const file = e.target.files && e.target.files[0];
  // const reader = new FileReader();
  // const [date, setDate] = useState("");
  // const [place, setPlace] = useState("");
  // const [peopleNum, setPeopleNum] = useState();
  // const [postImg, setPostImg] = useState<string | null>(null);

  //   reader.onloadend = () => {
  //     if (reader.result) {
  //       setPostImg(reader.result as any);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <div className="CreateSchedulesContainer">
      <div className="clubName">
        <div>대충 클럽네임</div>
      </div>
      <div className="SchedulesFormContainer">
        <form className="schedulesForm" action="">
          <div className="schedulesMiddleBox">
            <div className="schedulesDateContainer">
              <div className="schedulesDateBox">
                <div className="SchedulesTextBox">
                  <MdDateRange className="SchedulesIcon" />
                  <div>날짜 및 시간</div>
                </div>
                <div></div>
                <input type="date" />
              </div>
            </div>
            <div className="schedulesDateContainer">
              <div className="schedulesDateBox">
                <div className="SchedulesTextBox">
                  <MdOutlinePlace className="SchedulesIcon" />
                  <div>장소</div>
                </div>
                <div>
                  <input type="text" placeholder="미정" />
                </div>
              </div>
            </div>
            <div className="schedulesDateContainer">
              <div className="schedulesDateBox">
                <div className="SchedulesTextBox">
                  <MdPeopleAlt className="SchedulesIcon" />
                  <div>인원</div>
                </div>
                <div>
                  <input type="number" placeholder="숫자만 입력 해주세요" />
                </div>
              </div>
            </div>
          </div>
          <div className="afterArea">
            <div className="textareaBox">
              <textarea
                name=""
                id=""
                placeholder="활동에 대한 설명을 적어주세요"
              ></textarea>
            </div>
          </div>
          <div className="schedulesSubmitContainer">
            <div className="schedulesSubmitBox">
              <input type="file" />
              <input type="submit" value={"작성완료"} className="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSchedules;

// <MdDateRange className="icons" />
//             <MdOutlinePlace className="icons" />
//             <MdPeopleAlt className="icons" />
