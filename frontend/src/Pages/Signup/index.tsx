import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../Apis/axios";
import NationBox from "../../Components/Nationoption/Selectbox";
import { IFormInput } from "../../Type/User";
import "./index.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);

  const navigate = useNavigate();
  const handleSignUpSuccess = () => {
    // 여기서 회원가입 성공 시에 success 페이지로 이동합니다.
    navigate("/signup/success");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await instance.post("api/accounts/", data, {
        withCredentials: true,
      });
      console.log(response);
      handleSignUpSuccess();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const isSignUpSuccess = (data) => {
    return true;
  };

  return (
    <div className="signup">
      <h1 className="signupTitle">회원가입</h1>
      <form className="signupForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="signupInputDiv">
          <div className="signupDiv">이메일 주소</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="예: landing@landing.com"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
                  message: "이메일의 형식이 올바르지 않습니다.",
                },
              })}
              type="email"
              id="email"
              name="email"
            />
            {errors.email && <Message>{errors.email.message}</Message>}
          </div>
        </div>

        <div className="signupInputDiv">
          <div className="signupDiv">비밀번호</div>
          <div className="rightSignDiv">
            <PasswordInputContainer>
              <PasswordInput
                placeholder="비밀번호를 입력해주세요."
                {...register("password1", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                    message: "숫자+영문+특수문자 조합 8자리 이상 입력해주세요.",
                  },
                  deps: ["password2"],
                })}
                type={showPassword ? "text" : "password"}
                id="password1"
                name="password1"
              />

              <EyeIcon
                className="eyesIcon"
                onClick={toggleShowPassword}
                as={eyeIcon ? AiFillEye : AiFillEyeInvisible}
              />
            </PasswordInputContainer>

            {errors.password1 && <Message>{errors.password1.message}</Message>}
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">비밀번호 확인</div>
          <div className="rightSignDiv">
            <PasswordInputContainer>
              <PasswordInput
                placeholder="비밀번호를 다시 입력해주세요."
                {...register("password2", {
                  required: true,
                  validate: (value) =>
                    value === watch("password1")
                      ? true
                      : "비밀번호를 확인해 주세요.",
                })}
                type={showPassword ? "text" : "password"}
                id="password2"
                name="password2"
              />
              <EyeIcon
                className="eyesIcon"
                onClick={toggleShowPassword}
                as={eyeIcon ? AiFillEye : AiFillEyeInvisible}
              />
            </PasswordInputContainer>
            {errors.password2 && <Message>{errors.password2.message}</Message>}
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">이용자 이름(닉네임)</div>
          <div className="rightSignDiv">
            <input
              placeholder="8글자 이내 한글로 적어주세요."
              className="signupInput"
              {...register("nickname", {
                required: true,
                maxLength: {
                  value: 8,
                  message: "8글자 이내로 입력해주세요.",
                },
                pattern: {
                  value: /^(?=.*[가-힣])[^0-9]{1,8}$/,
                  message:
                    "숫자,영어로 이루어진 이름(닉네임)은 사용하실 수 없습니다.",
                },
              })}
              type="text"
              id="nickname"
              name="nickname"
            />
            {errors.nickname && <Message>{errors.nickname.message}</Message>}
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">국적</div>
          <div className="rightSignDiv">
            <Controller
              name="nationality"
              control={control}
              defaultValue="Korea, Republic of"
              rules={{ required: true }}
              render={({ field }) => <NationBox field={field} />}
            />
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">이름 (First Name)</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              {...register("first_name", {
                required: true,
                pattern: /^[A-Za-z|가-힣]{1,}$/,
              })}
              type="text"
              id="first_name"
              name="first_name"
            />
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">성 (Last Name)</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              {...register("last_name", {
                required: true,
                pattern: /^[A-Za-z|가-힣]{1,}$/,
              })}
              type="text"
              id="last_name"
              name="last_name"
            />
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">휴대폰 번호</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="010-1234-1234"
              {...register("phone", {
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
            {errors.phone && <Message>{errors.phone.message}</Message>}
          </div>
        </div>

        <div className="signupInputDiv">
          <div className="signupDiv">생년월일</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              {...register("date_of_birth", {
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  const minDate = new Date("1901-01-01");
                  const maxDate = new Date("2014-12-31");
                  const ageLimitDate = new Date();
                  ageLimitDate.setFullYear(currentDate.getFullYear() - 10); // 10년 미만은 가입 불가능

                  if (selectedDate > ageLimitDate) {
                    return "10대 미만은 가입할 수 없습니다.";
                  }
                  return true; // 유효성 검사 통과
                },
              })}
              type="date"
              id="date_of_birth"
              name="date_of_birth"
            />
            {errors.date_of_birth && (
              <Message>{errors.date_of_birth.message}</Message>
            )}
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">직업</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              {...register("profession", {
                required: false,
              })}
              type="text"
              id="profession"
              name="profession"
            />
          </div>
        </div>
        <div className="signupBtnBox">
          <button className="signupBtn" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

export const Message = styled.p`
  width: 220px;
  color: red;
  font-size: 0.85rem;
  margin-top: 5px;
  padding-left: 5px;

  @media screen and (max-width: 767px) {
    width: 200px;
    color: red;
    font-size: 0.85rem;
    margin-top: 5px;
    padding-left: 5px;
  }
`;
export const PasswordInputContainer = styled.div`
  position: relative;
  width: 220px;
  height: 40px;

  @media screen and (max-width: 767px) {
    position: relative;
    width: 200px;
    height: 40px;
  }
`;

export const PasswordInput = styled.input`
  display: block;
  margin-top: 13.5px;
  width: 100%;
  height: 100%;
  padding: 0 30px 0 5px;
  border-radius: 5px;
  text-align: left;
  border: 1px solid;
  font-size: 1rem;
  /* 아이콘을 감싸기 위한 여백 */
`;

const EyeIcon = styled(AiFillEyeInvisible)`
  position: absolute;
  top: 51%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
`;
