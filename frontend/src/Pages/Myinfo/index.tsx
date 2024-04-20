import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import NationBox from "../../Components/Nationoption/Selectbox";
import { Message } from "../Signup";
import "./index.css";

interface MyInfoInput {
  new_nickname: string;
  comment: string;
  new_password1: string;
  new_password2: string;
  new_nationality: string;
  new_first_name: string;
  new_last_name: string;
  new_phone: string;
  new_birth: Date;
  new_profession: string;
  profileImage: FileList;
}

function MyInfo() {
  const [pageMode, setPageMode] = useState("VIEW");
  const [userData, setUserData] = useState<any>({});

  let { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<MyInfoInput>();

  const [imgPreview, setImgPreview] = useState(
    "../public/pictures/Myinfo/profileImg.png",
  );
  const image = watch("profileImage");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleImgClick = () => {
    const fileInput = document.getElementById(
      "profileImageInput",
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const togglePageMode = () => {
    const nextMode = pageMode === "VIEW" ? "EDIT" : "VIEW";
    if (nextMode === "VIEW") {
      console.log("전송", values);
    }

    setPageMode(nextMode);
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
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const pk = localStorage.getItem("pk");
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const response = await instance.get(`api/users/${pk}`, config);
        console.log(response.data);
        setUserData(response.data);
        setValues({
          ...values,
          nickname: response.data.nickname || "",
          password1: response.data.password1 || "",
          password2: response.data.password2 || "",
          nationality: response.data.nationality || "",
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          phone: response.data.phone || "",
          date_of_birth: response.data.date_of_birth || "",
          profession: response.data.profession || "",
          profile_image: response.data.profile_image || "",
          // 기본값은 빈 문자열로 설정
          // 다른 필드들도 필요에 따라 설정 가능
        });
      } catch (error) {
        console.error("error", error);
      }
    }
    fetchData();
  }, []);

  const onChangeEdit = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="myinfo">
      <h1 className="myinfoTitle">내 정보수정</h1>
      <form className="myinfoForm">
        <div className="myinfoImgEdit">
          {pageMode === "VIEW" && (
            <img
              className="myinfoProfileImg"
              src={imgPreview}
              alt="프로필사진"
            />
          )}
          {pageMode === "EDIT" && (
            <div className="profileImgEdit" onClick={handleImgClick}>
              <img
                className="myinfoProfileImg"
                src={imgPreview}
                alt="프로필사진"
              />
              <input
                type="file"
                {...register("profileImage")}
                name="profileImage"
                id="profileImageInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          )}

          <MdEdit onClick={handleImgClick} className="MdEditIcon" />
        </div>
        <div className="NickandFlag">
          {pageMode === "VIEW" && (
            <div className="myinfoNickName">{userData.nickname}</div>
          )}
          {pageMode === "EDIT" && (
            <input
              className="myinfoEditInput"
              onChange={onChangeEdit}
              type="text"
              id="nickname"
              name="nickname"
              value={values.nickname}
            />
          )}

          <div className="nationImg">
            <img
              className="nationFlag"
              src="../public/pictures/Myinfo/korea.jpg"
            />
          </div>
        </div>
        <div className="myinfoUpdate">
          <div className="signupDate">2024년 가입</div>
          {/* <div className="commentEdit">
            {pageMode === "VIEW" && (
              <div className="myinfoComment">{userData.comment}</div>
            )}
            {pageMode === "EDIT" && (
              <textarea
                className="commentEditInput"
                id="comment"
                name="comment"
                onChange={onChangeEdit}
              />
            )}
          </div> */}
        </div>

        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && <div className="myinfoEditInput"></div>}
            {
              pageMode === "EDIT" && (
                <input
                  className="myinfoEditInput"
                  {...register("new_password1", {
                    required: false,
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                      message:
                        "숫자+영문+특수문자 조합 8자리 이상 입력해주세요.",
                    },
                    deps: ["password2"],
                  })}
                  type="password"
                  id="new_password1"
                  name="new_password1"
                />
              )
              /* {errors.new_password1 && (
              <Message>{errors.new_password1.message}</Message>
            )} */
            }
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호 확인</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && <div className="myinfoEditInput"></div>}
            {
              pageMode === "EDIT" && (
                <input
                  className="myinfoEditInput"
                  {...register("new_password2", {
                    required: false,
                    validate: (value) =>
                      value === watch("new_password1")
                        ? true
                        : "비밀번호를 확인해 주세요.",
                  })}
                  type="password"
                  id="new_password2"
                  name="new_password2"
                />
              )
              /* {errors.new_password2 && (
              <Message>{errors.new_password2.message}</Message>
            )} */
            }
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">국적</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoEditInput">{userData.nationality}</div>
            )}
            {pageMode === "EDIT" && (
              <Controller
                name="new_nationality"
                control={control}
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
              <div className="myinfoEditInput">{userData.first_name}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("new_first_name", {
                  required: false,
                  pattern: /^[A-Za-z|가-힣]{1,}$/,
                })}
                type="text"
                id="first_name"
                name="first_name"
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">성 (Last Name)</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoEditInput">{userData.last_name}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("new_last_name", {
                  required: true,
                  pattern: /^[A-Za-z|가-힣]{1,}$/,
                })}
                type="text"
                id="last_name"
                name="last_name"
              />
            )}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">휴대폰 번호</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoEditInput">{userData.phone}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                placeholder="010-1234-1234"
                {...register("new_phone", {
                  required: true,
                  pattern: {
                    value: /^010-([0-9]{3,4})-([0-9]{4})$/,
                    message: "올바른 형식이 아닙니다.",
                  },
                })}
                type="text"
                id="phone"
                name="phone"
              />
            )}
            {errors.new_phone && <Message>{errors.new_phone.message}</Message>}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">생년월일</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoEditInput">{userData.date_of_birth}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                {...register("new_birth", {
                  required: false,
                  min: "1901-01-01",
                  max: "2014-12-31",
                })}
                type="date"
                id="new_birth"
                name="new_birth"
              />
            )}
            {}
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">직업</div>
          <div className="rightInfoDiv">
            {pageMode === "VIEW" && (
              <div className="myinfoEditInput">{userData.profession}</div>
            )}
            {pageMode === "EDIT" && (
              <input
                className="myinfoEditInput"
                type="text"
                {...register("new_profession", {
                  required: false,
                })}
                id="new_profession"
                name="new_profession"
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
    </div>
  );
}

export default MyInfo;
