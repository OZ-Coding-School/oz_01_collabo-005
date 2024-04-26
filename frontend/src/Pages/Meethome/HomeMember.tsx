import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import instance from "../../Apis/axios";
import "./HomeMember.css";
import "./MemberList.css";

function HomeMember() {
  const { id }: any = useParams();
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const response = await instance.get(`api/clubs/${id}/members/`, config);
        console.log(response.data.results); // Log the response data to see its content
        setUserData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("error", error);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const navigate = useNavigate();

  function handleShowMemberList() {
    // MemberList 페이지로 이동
    navigate(`/clubs/${id}/members`);
  }

  // 함수 추가
  function returnLimitedMembers(userData) {
    if (userData.length === 0) {
      return [];
    } else if (userData.length === 1) {
      return [userData[0]];
    } else if (userData.length === 2) {
      return [userData[0], userData[1]];
    } else {
      return [userData[0], userData[1], userData[2]];
    }
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {userData.length === 0 ? (
            <div>멤버가 없습니다.</div>
          ) : (
            <>
              {returnLimitedMembers(userData).map((member: any) => (
                <div className="homeMemberContainer" key={member.id}>
                  <div className="memberListImgDiv">
                    {member.user.profile_image ? (
                      <img
                        className="memberListImg"
                        src={member.user.profile_image}
                      />
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
                  </div>
                </div>
              ))}
            </>
          )}
          {userData.length >= 3 && (
            <div className="intoMemberPage" onClick={handleShowMemberList}>
              <div className="allMemberPage">
                <button>전체보기 〉</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomeMember;
