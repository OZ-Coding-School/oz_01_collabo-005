import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../Apis/axios";
import Deletemember from "../../Components/Deletemember";
import NationBox from "../../Components/Nationoption/Selectbox";
import { MyInfoInput } from "../../Type/User";
import { Message, PasswordInput, PasswordInputContainer } from "../Signup";
import "./index.css";

function MyInfo() {
  const [pageMode, setPageMode] = useState("VIEW");
  const [userData, setUserData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  // const [touched, setTouched] = useState({
  //   nickname: false,
  //   password1: false,
  //   password2: false,
  //   first_name: false,
  //   last_name: false,
  //   phone: false,
  //   date_of_birth: false,
  //   profession: false,
  //   profile_image: false,
  //   date_joined: false,
  // });

  // const handleBlur = (e) => {
  //   setTouched({
  //     ...touched,
  //     [e.target.name]: true,
  //   });
  // };

  let { pk } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, touchedFields },
    setValue,
  } = useForm<MyInfoInput>();

  const [imgPreview, setImgPreview] = useState(import.meta.env.VITE_PROFILE);
  const image = watch("profile_image");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setValues({
        ...values,
        profile_image: file, // 파일 객체로 profile_image 필드를 업데이트
      });
    }
  };

  useEffect(() => {
    // Retrieve image URL from local storage upon component mount
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImgPreview(storedImage);
    }
  }, []);

  const handleImgClick = () => {
    const fileInput = document.getElementById(
      "profileImageInput",
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const togglePageMode = async () => {
    const nextMode = pageMode === "VIEW" ? "EDIT" : "VIEW";
    if (nextMode === "VIEW") {
      try {
        await sendPatchRequest(values);
        setPageMode(nextMode); //
      } catch (error) {
        console.error("수정요청 실패", error);
      }
    } else {
      setPageMode(nextMode);
    }
  };

  const [values, setValues] = useState({
    nickname: "",
    password1: "",
    password2: "",
    nationality: "",
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    profession: "",
    profile_image: "",
    date_joined: "",
  });

  const dateJoined = userData.date_joined
    ? userData.date_joined.substring(0, 7)
    : "";

  const sendPatchRequest = async (data: MyInfoInput) => {
    try {
      data.date_of_birth = data.date_of_birth.toString();

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await instance.patch(
        `api/accounts/user/`,
        formData,
        config,
      );

      // 수정된 정보에 따라 화면 갱신 또는 다른 작업 수행

      //수정된 데이터를 다시 가져와서 화면에 반영
      const updateUserData = await getUserData();
      setUserData(updateUserData);
      setPageMode("VIEW");
    } catch (error) {
      console.error("error", error);
    }
  };

  // 사용자 데이터를 가져오는 함수
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await instance.get(`api/accounts/user`, config);
      return response.data;
    } catch (error) {
      console.error("error", error);
      return {}; // 에러 발생 시 빈 객체 반환
    }
  };

  //정보 가져오기
  useEffect(() => {
    async function getData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const response = await instance.get(`api/accounts/user/`, config);

        setUserData(response.data);
        setValues({
          ...values,
          date_joined: response.data.date_joined || "",
          nickname: response.data.nickname || "",
          password1: response.data.password1 || "",
          password2: response.data.password2 || "",
          nationality: response.data.nationality || "",
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          phone: response.data.phone || "",
          date_of_birth: response.data.date_of_birth || "",
          profession: response.data.profession || "",
          profile_image:
            response.data.profile_image || import.meta.env.VITE_PROFILE,
          // 기본값은 빈 문자열로 설정
          // 다른 필드들도 필요에 따라 설정 가능
        });
      } catch (error) {
        console.error("error", error);
      }
    }
    getData();
  }, []);

  const onChangeEdit = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  };

  return (
    <div className="myinfo">
      <h1 className="myinfoTitle">내 정보수정</h1>
      <form className="myinfoForm">
        <div className="myinfoImgEdit">
          {pageMode === "VIEW" && (
            <img
              className="myinfoProfileImg"
              src={values.profile_image}
              alt="프로필사진"
            />
          )}
          {pageMode === "EDIT" && (
            <div className="profileImgEdit" onClick={handleImgClick}>
              <img
                className="myinfoProfileImg"
                src={values.profile_image}
                alt="프로필사진"
              />
              <input
                type="file"
                {...register("profile_image")}
                name="profileImage"
                id="profileImageInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          )}

          <MdEdit onClick={handleImgClick} className="MdEditIcon" />
        </div>
        <div className="nickName">
          {pageMode === "VIEW" && (
            <div className="myinfoNickName">{values.nickname}</div>
          )}
          {pageMode === "EDIT" && (
            <input
              className="myinfoNickEditInput"
              onChange={onChangeEdit}
              type="text"
              id="nickname"
              name="nickname"
              value={values.nickname}
            />
          )}
          <div className="myinfoUpdate">
            <div className="myinfoSignupDate">{dateJoined} 가입</div>
          </div>
        </div>

        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호</div>
          <div className="rightInfoDiv">
            <PasswordInputContainer>
              {pageMode === "VIEW" && <div className="myinfoBeforeEdit"></div>}
              {pageMode === "EDIT" && (
                <PasswordInput
                  className="myinfoEditInput"
                  {...register("password1", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                      message:
                        "숫자+영문+특수문자 조합 8자리 이상 입력해주세요.",
                    },
                    deps: ["password2"],
                  })}
                  type={showPassword ? "text" : "password"}
                  onChange={onChangeEdit}
                  id="password1"
                  name="password1"
                  value={values.password1}
                />
              )}
              <EyeIcons
                className="eyesIcon"
                onClick={toggleShowPassword}
                as={eyeIcon ? AiFillEye : AiFillEyeInvisible}
              />
            </PasswordInputContainer>
            {errors.password1 && <Message>{errors.password1.message}</Message>}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호 확인</div>
          <div className="rightInfoDiv">
            <PasswordInputContainer>
              {pageMode === "VIEW" && <div className="myinfoBeforeEdit"></div>}
              {pageMode === "EDIT" && (
                <PasswordInput
                  {...register("password2", {
                    required: true,
                    validate: (value) =>
                      value === watch("password1")
                        ? true
                        : "비밀번호를 확인해 주세요.",
                  })}
                  type={showPassword ? "text" : "password"}
                  onChange={onChangeEdit}
                  id="password2"
                  name="password2"
                  value={values.password2}
                />
              )}
              <EyeIcons
                className="eyesIcon"
                onClick={toggleShowPassword}
                as={eyeIcon ? AiFillEye : AiFillEyeInvisible}
              />
            </PasswordInputContainer>
            {errors.password2 && <Message>{errors.password2.message}</Message>}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">국적</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.nationality}</div>
            )}
            {pageMode === "EDIT" && (
              <Controller
                name="nationality"
                control={control}
                defaultValue={userData.nationality}
                rules={{ required: true }}
                render={({ field }) => <NationBox field={field} />}
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">이름 (First Name)</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.first_name}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("first_name", {
                  required: false,
                  pattern: /^[A-Za-z|가-힣]{1,}$/,
                })}
                type="text"
                onChange={onChangeEdit}
                id="first_name"
                name="first_name"
                value={values.first_name}
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">성 (Last Name)</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.last_name}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("last_name", {
                  required: true,
                  pattern: /^[A-Za-z|가-힣]{1,}$/,
                })}
                type="text"
                onChange={onChangeEdit}
                id="last_name"
                name="last_name"
                value={values.last_name}
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">휴대폰 번호</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.phone}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                placeholder="010-1234-1234"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^010-([0-9]{3,4})-([0-9]{4})$/,
                    message: "올바른 형식이 아닙니다.",
                  },
                })}
                type="text"
                onChange={onChangeEdit}
                id="phone"
                name="phone"
                value={values.phone}
              />
            )}
            {errors.phone && <Message>{errors.phone.message}</Message>}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">생년월일</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.date_of_birth}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("date_of_birth", {
                  required: false,
                  min: "1901-01-01",
                  max: "2014-12-31",
                })}
                type="date"
                onChange={onChangeEdit}
                id="date_of_birth"
                name="date_of_birth"
                value={values.date_of_birth}
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">직업</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoBeforeEdit">{userData.profession}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("profession", {
                  required: false,
                })}
                type="text"
                onChange={onChangeEdit}
                id="profession"
                name="profession"
                value={values.profession}
              />
            )}
          </div>
        </div>
        <div className="myinfoBtnBox">
          <button className="myinfoBtn" type="button" onClick={togglePageMode}>
            {pageMode === "VIEW" ? "수정하기" : "수정완료"}
          </button>
        </div>
      </form>
      <Deletemember />
    </div>
  );
}

export default MyInfo;

const EyeIcons = styled(AiFillEyeInvisible)`
  position: absolute;
  top: 54%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
`;
