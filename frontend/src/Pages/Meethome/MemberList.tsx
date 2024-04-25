import { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../Apis/axios";
import "./MemberList.css";

function MemberList() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [userData, setUserData] = useState<any[]>([]);

  function handleShowClub() {
    // MemberList 페이지로 이동
    navigate(`/meetHome/${id}`);
  }

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const response = await instance.get(`api/clubs/${id}/members`, config);
        console.log(response.data.results); // Log the response data to see its content
        setUserData(response.data.results);
      } catch (error) {
        console.error("error", error);
      }
    }
    getData();
  }, []);
  return (
    <div className="memberListForm">
      <div className="memberIcon">
        <StyleIoArrowBackOutline onClick={handleShowClub} />
        <div className="memberList">
          <StyleHiUsers />
          <div className="memberText">멤버 목록</div>
        </div>
      </div>
      {/* <nav>
        <ul>
          <li className="memberListNav">가입한 멤버</li>
        </ul>
      </nav> */}

      {userData.map((member: any) => (
        <div className="membersDiv" key={member.id}>
          <div className="memberListImgDiv">
            {member.user.profile_image ? (
              <img className="memberListImg" src={member.user.profile_image} />
            ) : (
              <img
                className="memberListImg"
                src={import.meta.env.VITE_PROFILE}
                alt="프로필 이미지"
              />
            )}
          </div>
          <div className="memberDiv">
            <div className="memberNickname">{member.user.nickname}</div>
            {/* <div className="memberDate">{member.}</div> */}
            <div className="memberNation">{member.user.nationality}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberList;

const StyleIoArrowBackOutline = styled(IoArrowBackOutline)`
  width: 25px;
  height: 25px;
  padding-top: 7px;

  @media screen and (max-width: 767px) {
    width: 24px;
    height: 24px;
    padding-top: 7px;
  }
`;

const StyleHiUsers = styled(HiUsers)`
  width: 26px;
  height: 26px;
  padding-top: 7px;

  @media screen and (max-width: 767px) {
    width: 24px;
    height: 24px;
    padding-top: 7px;
  }
`;
