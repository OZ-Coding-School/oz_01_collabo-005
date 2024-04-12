import React, { useState } from "react";
import "./index.css";

function CreateMeet() {
  const categories = [
    "취미/오락",
    "문화 예술",
    "자기계발",
    "음악/악기",
    "가족/육아",
    "아웃도어",
    "책/인문학",
    "운동",
  ];
  const ages: string[] = ["10", "20", "30", "40", "50", "60", "70"];
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectAges, setSelectAges] = useState<string>("");
  const [postImg, setPostImg] = useState<string | null>(null);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectCategory(value);
    }
  };
  const handleAgeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectAges(value);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPostImg(reader.result as any);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="CreateMeetContainer">
      <form className="formContainer">
        <div className="contentBox">
          {categories.map((category, index) => (
            <label
              className={
                category === selectCategory ? "catBox selected" : "catBox"
              }
              key={index}
            >
              <input
                type="checkbox"
                value={category}
                checked={category === selectCategory}
                onChange={handleCategoryChange}
              ></input>
              <div className="">{category}</div>
            </label>
          ))}
        </div>

        <div className="contentBox">
          {ages.map((age, index) => (
            <label
              className={age === selectAges ? "catBox selected" : "catBox"}
              key={index}
            >
              <input
                type="checkbox"
                value={age}
                checked={age === selectAges}
                onChange={handleAgeChange}
              ></input>
              <div>{age}대</div>
            </label>
          ))}
        </div>
        <div className="namePlaceBox">
          <div className="meetName">
            <div className="titles">모임명</div>
            <input placeholder="모임명이 짧을수록 이해하기 쉬워요."></input>
          </div>
          <div className="meetPlace">
            <div className="titles">자주 모이는 장소</div>
            <input placeholder="장소명으로 기입"></input>
          </div>
        </div>
        <div className="meetIntro">
          <div className="titles">모임소개</div>
          <textarea
            cols={100}
            rows={30}
            placeholder="활동 중심으로 모임을 소개해주세요.   (모임설정에서 언제든지 바꿀 수 있어요)"
          ></textarea>
        </div>
        <div className="photoContainer">
          <div className="titles">대표사진</div>
          <div className="photoTextBox">
            <h4>모임을 대표할 수 있는 사진을 만들어주세요</h4>
            <input type="file" onChange={handleImgChange} />
          </div>
          <div className="imgBox">
            {postImg && <img src={postImg} alt="미리보기" />}
          </div>
          <div className="subBox">
            <input type="submit" className="submit" value={"모임 개설"} />
          </div>
        </div>
        <div className="pick">선택된 카테고리 : {selectCategory}</div>
        <div className="pick">선택된 나이 : {selectAges}대</div>
      </form>
    </div>
  );
}

export default CreateMeet;
