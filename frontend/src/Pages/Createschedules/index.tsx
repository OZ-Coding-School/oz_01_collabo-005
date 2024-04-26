import React, { useState } from "react";
import { MdDateRange, MdOutlinePlace, MdPeopleAlt } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import "./index.css";

function CreateSchedules() {
  const { id } = useParams();

  interface CreateSchedulesValue {
    title: string;
    content: string;
    event_time: Date;
    place: string;
    max_attendees: number;
  }

  const [formData, setFormData] = useState<CreateSchedulesValue>({
    title: "",
    content: "",
    event_time: new Date(),
    place: "",
    max_attendees: 1,
  });

  const navigate = useNavigate();

  const ParseDate = new Date();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void,
  ) => {
    const { value } = e.target;
    setter(value);
  };

  // 타이틀 설정
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, (value) => setFormData({ ...formData, title: value }));
  };

  // 콘텐츠 설정
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e, (value) =>
      setFormData({ ...formData, content: value }),
    );
  };
  // 이벤트타임 설정
  const handleEventTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // 사용자가 입력한 값
    const localTime = new Date(inputValue); // 입력한 값을 로컬 시간으로 변환
    const koreanTime = new Date(localTime.getTime() + 9 * 60 * 60 * 1000); // 한국 시간으로 변환 (시차 9시간)
    setFormData({ ...formData, event_time: koreanTime });
  };
  //장소 설정
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, (value) => setFormData({ ...formData, place: value }));
  };
  // 사람 인원 체크
  const handlePeopleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value); // 입력값을 정수로 변환
    setFormData({ ...formData, max_attendees: inputValue });
  };

  //제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("event_time", formData.event_time.toISOString());
    formDataToSend.append("place", formData.place);
    formDataToSend.append("max_attendees", formData.max_attendees.toString());

    try {
      const response = await instance.post(
        `api/clubs/${id}/schedules/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate(`/meetHome/${id}`);
      alert("일정 글을 등록했어요.");
    } catch (error) {
      alert("게시판 글 실패");
      console.log(error);
    }
  };

  return (
    <div className="CreateSchedulesContainer">
      <div className="SchedulesFormContainer">
        <form className="schedulesForm" onSubmit={handleSubmit}>
          <div className="clubName">
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              name="board-title"
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="schedulesMiddleBox">
            <div className="schedulesDateContainer">
              <div className="schedulesDateBox">
                <div className="SchedulesTextBox">
                  <MdDateRange className="SchedulesIcon" />
                  <div>날짜 및 시간</div>
                </div>
                <div></div>
                <input
                  type="datetime-local"
                  value={formData.event_time.toISOString().slice(0, -8)}
                  onChange={handleEventTimeChange}
                />
              </div>
            </div>
            <div className="schedulesDateContainer">
              <div className="schedulesDateBox">
                <div className="SchedulesTextBox">
                  <MdOutlinePlace className="SchedulesIcon" />
                  <div>장소</div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="미정"
                    value={formData.place}
                    onChange={handlePlaceChange}
                  />
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
                  <input
                    type="number"
                    placeholder="숫자만 입력 해주세요"
                    value={formData.max_attendees}
                    onChange={handlePeopleNumChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="afterArea">
            <div className="textareaBox">
              <textarea
                placeholder="활동에 대한 설명을 적어주세요"
                value={formData.content}
                onChange={handleContentChange}
              ></textarea>
            </div>
          </div>
          <div className="schedulesSubmitContainer">
            <div className="schedulesSubmitBox">
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
