import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import "./index.css";

function CreateBoard() {
  const { id } = useParams();

  interface CreateBoardValue {
    title: string;
    content: string;
    image: File | null;
  }

  const [formData, setFormData] = useState<CreateBoardValue>({
    title: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();

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

  // 이미지 설정
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, image: file });
  };
  //제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    console.log(formData);

    try {
      const response = await instance.post(
        `api/clubs/${id}/posts/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate(`/meetHome/${id}`);
      alert("게시판 글 등록했어요.");
    } catch (error) {
      alert("게시판 글 실패");
      console.log(error);
    }
  };

  return (
    <div className="writeBoardContainer">
      <div className="OnClickBoardContainer">
        <form className="boardForm" onSubmit={handleSubmit}>
          <div className="beforeText">
            <div className="writeBoardImgBox">
              <img src="./pictures/Main/ex0.jpeg" alt="" />
            </div>
            <div className="topTitleBox">
              <div className="boardUserName">
                {localStorage.getItem("first_name")}
                {localStorage.getItem("last_name")}
              </div>
              <input
                className="boardTitle"
                type="text"
                placeholder="제목을 입력해주세요"
                name="board-title"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>
          </div>
          <div className="textareaBox">
            <textarea
              name="board-detail"
              id=""
              placeholder="글을 입력해주세요"
              value={formData.content}
              onChange={handleContentChange}
            ></textarea>
          </div>

          <div className="schedulesSubmitContainer">
            <div className="submitBox">
              <input type="file" accept="image/*" onChange={handleImgChange} />
              <input type="submit" value={"작성완료"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoard;
