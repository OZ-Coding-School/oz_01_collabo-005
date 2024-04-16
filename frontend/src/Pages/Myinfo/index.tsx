import { MdEdit } from "react-icons/md";
import "./index.css";

function MyInfo() {
  return (
    <div className="myinfo">
      <h1 className="myinfoTitle">내 정보수정</h1>
      <form className="myinfoForm">
        <div className="myinfoImgEdit">
          <img
            className="myinfoProfileImg"
            src="../public/pictures/Myinfo/1.jpg"
            alt="프로필사진"
          />
          <div className="editIcon">
            <MdEdit />
          </div>
          <input type="file" />
        </div>
        <div className="NickandFlag">
          <div className="myinfoNickName">리디아</div>
          <div className="nationImg">
            <img
              className="nationFlag"
              src="../public/pictures/Myinfo/korea.jpg"
            />
          </div>
        </div>
        <div className="myinfoUpdate">
          <div className="signupDate">2024년 가입 </div>
          <div className="myinfoComment">
            다양한 사람들과 한국어로 대화 <MdEdit />
          </div>
        </div>

        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              type="password"
              id="password"
              name="password"
              // value={password}
              // onChange={onChangePassword}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">비밀번호 확인</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              // value={passwordConfirm}
              // onChange={onChangePassword}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">국적</div>
          <div className="rightInfoDiv"></div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">이름</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              type="text"
              id="name"
              name="name"
              // value={passwordConfirm}
              // onChange={onChangePassword}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">휴대폰 번호</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              placeholder="010-1234-1234"
              type="text"
              id="phone"
              name="phone"
              // value={phone}
              // onChange={addHyphen}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">이메일 주소</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              placeholder="예: landing@landing.com"
              type="email"
              id="email"
              name="email"
              // value={email}
              // required
              // onChange={onChangeEmail}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">생년월일</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              placeholder="20240101"
              type="text"
              id="birth"
              name="birth"
              // value={birth}
              // required
              // onChange={onChangeBirth}
            />
          </div>
        </div>
        <div className="myinfoEdit">
          <div className="myinfoDiv">직업</div>
          <div className="rightInfoDiv">
            <input
              className="myinfoEditInput"
              type="text"
              id="job"
              name="job"
              // value={job}
              // onChange={onChangeJob}
            />
          </div>
        </div>
        <div className="myinfoBtnBox">
          <button className="myinfoBtn">수정 완료</button>
        </div>
      </form>
    </div>
  );
}

export default MyInfo;
