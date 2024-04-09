import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import SelectBox from "../../Components/Selectbox";
import "./index.css";

function SignUp() {
  //초기값세팅
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [job, setJob] = useState("");

  //오류메세지 상태값 세팅
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  //유효성 검사 세팅
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  //색상변경 아이디 패스워드1,2 이메일 폰 생일
  const [idMessageColor, setIdMessageColor] = useState("red");
  const [passwordMessageColor, setPasswordMessageColor] = useState("red");
  const [ConfirmMessageColor, setConfirmMessageColor] = useState("red");
  const [emailMessageColor, setEmailMessageColor] = useState("red");
  const [phoneMessageColor, setPhoneMessageColor] = useState("red");
  const [birthMessageColor, setBirthMessageColor] = useState("red");

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[가-힣0-9].{0,8}$/;
    const onlyNumbersRegExp = /^[0-9]+$/;
    if (onlyNumbersRegExp.test(currentId)) {
      // 닉네임이 숫자로만 되어 있는 경우 처리
      setIdMessage("숫자로만 된 이름(닉네임)을 사용할 수 없습니다.");
      setIsId(false);
      setIdMessageColor("red");
    } else if (!idRegExp.test(currentId)) {
      // 닉네임이 한글과 숫자를 혼합하여 8글자 이내가 아닌 경우 처리
      setIdMessage("8글자 이내로 입력해주세요.");
      setIsId(false);
      setIdMessageColor("red");
    } else {
      // 사용 가능한 닉네임인 경우 처리
      setIdMessage("사용 가능한 닉네임 입니다.");
      setIsId(true);
      setIdMessageColor("green");
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage("숫자+영문+특수문자 조합 8자리 이상 입력해주세요.");
      setIsPassword(false);
      setPasswordMessageColor("red");
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
      setPasswordMessageColor("green");
    }
  };

  const onChangPasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
      setConfirmMessageColor("red");
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
      setConfirmMessageColor("green");
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const currentName = e.target.value;
    setName(currentName);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다.");
      setIsEmail(false);
      setEmailMessageColor("red");
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
      setEmailMessageColor("green");
    }
  };

  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setPhone(currentPhone);
    const phoneRegExp = /^010-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다.");
      setIsPhone(false);
      setPhoneMessageColor("red");
    } else {
      setPhoneMessage(" ");
      setIsPhone(true);
    }
  };

  const addHyphen = (e: ChangeEvent<HTMLInputElement>) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
    const birthRegExp = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    if (!birthRegExp.test(currentBirth)) {
      setBirthMessage("올바른 형식이 아닙니다.");
      setIsBirth(false);
      setBirthMessageColor("red");
    } else {
      setBirthMessage(" ");
      setIsBirth(true);
      setBirthMessageColor("green");
    }
  };

  const onChangeJob = (e: ChangeEvent<HTMLInputElement>) => {
    const currentJob = e.target.value;
    setJob(currentJob);
  };

  return (
    <div className="signup">
      <h1 className="signupTitle">회원가입</h1>
      <form className="signupForm">
        <div className="signupInputDiv">
          <div className="signupDiv">이용자 이름(닉네임)</div>
          <div className="rightSignDiv">
            <input
              placeholder="8글자 이내 한글로 적어주세요."
              className="signupInput"
              type="text"
              id="id"
              name="id"
              value={id}
              required
              onChange={onChangeId}
            />
            <Message color={idMessageColor}>{idMessage}</Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">비밀번호</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={onChangePassword}
            />
            <Message color={passwordMessageColor}>{passwordMessage}</Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">비밀번호 확인</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              required
              onChange={onChangPasswordConfirm}
            />
            <Message color={ConfirmMessageColor}>
              {passwordConfirmMessage}
            </Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">국적</div>
          <div className="rightSighDiv">
            <SelectBox defaultValue="Korea, Republic of"></SelectBox>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">이름</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={onChangeName}
            />
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">휴대폰 번호</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="010-1234-1234"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={addHyphen}
              required
            />
            <Message color={phoneMessageColor}>{phoneMessage}</Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">이메일 주소</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="예: landing@landing.com"
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
            <Message color={emailMessageColor}>{emailMessage}</Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">생년월일</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              placeholder="20240101"
              type="text"
              id="birth"
              name="birth"
              value={birth}
              required
              onChange={onChangeBirth}
            />
            <Message color={birthMessageColor}>{birthMessage}</Message>
          </div>
        </div>
        <div className="signupInputDiv">
          <div className="signupDiv">직업</div>
          <div className="rightSignDiv">
            <input
              className="signupInput"
              type="text"
              id="job"
              name="job"
              value={job}
              onChange={onChangeJob}
            />
          </div>
        </div>
        <div className="signupBtnBox">
          <button className="signupBtn">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

const Message = styled.p`
  color: ${(props) => props.color};
  font-size: 0.85rem;
  margin-top: 5px;
  padding-left: 5px;
`;
