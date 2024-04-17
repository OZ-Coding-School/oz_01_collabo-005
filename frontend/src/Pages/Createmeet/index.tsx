import React, { useState } from "react";
import "./index.css";
import instance from "../../Apis/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateMeet() {
  const categories = [
    "취미/오락",
    "문화/예술",
    "자기계발",
    "음악/악기",
    "가족/육아",
    "아웃도어",
    "책/인문학",
    "운동",
  ];
  const ages: string[] = ["1", "2", "3", "4", "5", "6", "7"];

  //보낼 거
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState("");
  const [postImg, setPostImg] = useState<string | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [selectAges, setSelectAges] = useState<string[]>([]);
  const [place, setPlace] = useState<string>("");

  const navigate = useNavigate();

  //카테고리 설정
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectCategory(value);
    }
  };

  //연령대 설정
  const handleAgeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      //클릭한 값이 이미 배열에 있는지 확인하고
      const index = selectAges.indexOf(value);
      //클릭한 값이 배열에 없으면 배열의 맨앞에 추가하기
      const newSelectedAges = [value, ...selectAges];
      newSelectedAges.sort((a, b) => a - b);
      setSelectAges(newSelectedAges);
    } else {
      //체크박스 해제되면, 값에서 필터링(제거) , 그 후에 상태 업데이트
      const newSelectedAges = selectAges.filter((age) => age !== value);
      setSelectAges(newSelectedAges);
    }
  };
  const handleInputChange = (e, setter) => {
    const { value } = e.target;
    setter(value);
  };

  // 모임명 설정
  const handleNameChange = (e) => {
    handleInputChange(e, setName);
  };

  // 장소 설정
  const handlePlaceChange = (e) => {
    handleInputChange(e, setPlace);
  };

  // 소개 설정
  const handleDescriptionChange = (e) => {
    handleInputChange(e, setDescription);
  };

  //이미지 설정
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      description: description,
      category: selectCategory,
      image: postImg,
      frequent_place: place,
      age_group: selectAges,
    };
    console.log(formData);
    try {
      const response = await instance.post("api/clubs/", formData);
      console.log(response.data);
      navigate("/");
      alert("모임 개설해주셔서 감사합니다.");
    } catch (error) {
      alert("전부 입력해주세요(사진은 선택)");
      console.log(error);
    }
  };

  return (
    <div className="CreateMeetContainer">
      <form className="formContainer" onSubmit={handleSubmit}>
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
              className={
                selectAges.includes(age) ? "catBox selected" : "catBox"
              }
              key={index}
            >
              <input
                type="checkbox"
                value={age}
                checked={selectAges.includes(age)}
                onChange={handleAgeChange}
              ></input>
              <div>{age}0대</div>
            </label>
          ))}
        </div>
        <div className="namePlaceBox">
          <div className="meetName">
            <div className="titles">모임명</div>
            <input
              type="text"
              placeholder="모임명이 짧을수록 이해하기 쉬워요."
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
          <div className="meetPlace">
            <div className="titles">자주 모이는 장소</div>
            <input
              placeholder="장소명으로 기입"
              value={place}
              onChange={handlePlaceChange}
            ></input>
          </div>
        </div>
        <div className="meetIntro">
          <div className="titles">모임소개</div>
          <textarea
            cols={100}
            rows={30}
            value={description}
            onChange={handleDescriptionChange}
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
        <div className="pick">선택된 나이 : {selectAges}0대</div>
      </form>
    </div>
  );
}

export default CreateMeet;
