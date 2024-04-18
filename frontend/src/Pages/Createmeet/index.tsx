import React, { useState } from "react";
import "./index.css";
import instance from "../../Apis/axios";
import { useNavigate } from "react-router-dom";

interface FormDataValue {
  name: string;
  description: string;
  category: number | null;
  frequent_place: string;
  age_group: number[];
  image: File | null;
}

function CreateMeet() {
  const categories = [
    { id: 1, value: "운동" },
    { id: 2, value: "취미/오락" },
    { id: 3, value: "아웃도어" },
    { id: 4, value: "가족/육아" },
    { id: 5, value: "책/인문학" },
    { id: 6, value: "음악/악기" },
    { id: 7, value: "문화/예술" },
    { id: 8, value: "자기계발" },
  ];
  const ages = [1, 2, 3, 4, 5, 6, 7];

  // FormData 객체 생성
  const [formData, setFormData] = useState<FormDataValue>({
    name: "",
    description: "",
    category: null,
    frequent_place: "",
    age_group: [],
    image: null,
  });

  const navigate = useNavigate();

  // 카테고리 설정
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, category: Number(value) });
    }
  };

  // 연령대 설정
  const handleAgeChange = (age: number) => {
    if (formData.age_group.includes(age)) {
      const updatedAges = formData.age_group.filter(
        (selectedAge) => selectedAge !== age,
      );
      setFormData({ ...formData, age_group: updatedAges });
    } else {
      setFormData({ ...formData, age_group: [...formData.age_group, age] });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void,
  ) => {
    const { value } = e.target;
    setter(value);
  };

  // 모임명 설정
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, (value) => setFormData({ ...formData, name: value }));
  };

  // 장소 설정
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, (value) =>
      setFormData({ ...formData, frequent_place: value }),
    );
  };

  // 소개 설정
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    handleInputChange(e, (value) =>
      setFormData({ ...formData, description: value }),
    );
  };

  // 이미지 설정
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.category !== null) {
      formDataToSend.append("category", String(formData.category));
    }
    formDataToSend.append("frequent_place", formData.frequent_place);
    formData.age_group.forEach((age) => {
      formDataToSend.append("age_group", String(age));
    });
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await instance.post("api/clubs/", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
        {/* 카테고리 선택 */}
        <div className="contentBox">
          {categories.map((category, index) => (
            <label
              key={category.id}
              className={
                index + 1 == formData.category ? "catBox selected" : "catBox"
              }
            >
              <input
                type="checkbox"
                value={category.id}
                checked={category.id === formData.category}
                onChange={handleCategoryChange}
              />
              <div>{category.value}</div>
            </label>
          ))}
        </div>

        {/* 연령대 선택 */}
        <div className="contentBox">
          {ages.map((age) => (
            <label
              key={age}
              className={
                formData.age_group.includes(age) ? "catBox selected" : "catBox"
              }
            >
              <input
                type="checkbox"
                value={age}
                checked={formData.age_group.includes(age)}
                onChange={() => handleAgeChange(age)}
              />
              <div>{age}0대</div>
            </label>
          ))}
        </div>

        {/* 모임명 및 장소 입력 */}
        <div className="namePlaceBox">
          <div className="meetName">
            <div className="titles">모임명</div>
            <input
              type="text"
              placeholder="모임명이 짧을수록 이해하기 쉬워요."
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="meetPlace">
            <div className="titles">자주 모이는 장소</div>
            <input
              placeholder="장소명으로 기입"
              value={formData.frequent_place}
              onChange={handlePlaceChange}
            />
          </div>
        </div>

        {/* 모임 소개 입력 */}
        <div className="meetIntro">
          <div className="titles">모임소개</div>
          <textarea
            cols={100}
            rows={30}
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="활동 중심으로 모임을 소개해주세요.   (모임설정에서 언제든지 바꿀 수 있어요)"
          />
        </div>

        {/* 대표 사진 입력 */}
        <div className="photoContainer">
          <div className="titles">대표사진</div>
          <div className="photoTextBox">
            <h4>모임을 대표할 수 있는 사진을 만들어주세요</h4>
            <input type="file" accept="image/*" onChange={handleImgChange} />
          </div>
          <div className="imgBox">
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="미리보기" />
            )}
          </div>
          <div className="subBox">
            <input type="submit" className="submit" value={"모임 개설"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateMeet;
