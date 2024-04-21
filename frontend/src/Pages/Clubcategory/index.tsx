import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import "./index.css";

function ClubCategory() {
  let { id } = useParams();
  const [club, setClub]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await instance.get(`api/categories/${id}`);
        setClub(response.data.club_set);
      } catch (error) {
        console.error("Error fetching", error);
      }
    }
    fetchClubs();
  }, []);
  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentClubs =
    Array.isArray(club) &&
    club.sort((a, b) => b.id - a.id).slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (
      (Array.isArray(currentClubs) && currentClubs.length < postsPerPage) ||
      (Array.isArray(currentClubs) && currentClubs.length === 0)
    ) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  // console.log();

  return (
    <div className="clubCategoryContainer">
      <div className="clubCategoryBox">
        {Array.isArray(currentClubs) &&
          currentClubs.map((clubName, index) => (
            <Link
              to={`/meetHome/${clubName.id}`}
              className="newPostBox"
              key={index}
            >
              <img
                src={
                  clubName.image ? clubName.image : import.meta.env.VITE_ICON
                }
                alt="포스트이미지"
              />
              <div className="postWriteBox">
                <div className="postTitle">{clubName.name}</div>
                <div className="postContent">{clubName.description}</div>
              </div>

              <div className="clubUpdatedDatePlace">
                <div>{clubName.frequent_place}</div>
                <div>{clubName.updated_at.slice(0, 10)}</div>
              </div>
            </Link>
          ))}
      </div>

      {/* 페이지네이션 UI */}
      <div className="pageNationButtonBox">
        <GrPrevious onClick={prevPage}>뒤로</GrPrevious>
        <div className="pageNationPages">
          {Array.from(
            { length: Math.ceil(club.length / postsPerPage) },
            (_, index) => index + 1,
          ).map((pageNumber) => (
            <button
              className={currentPage === pageNumber ? "selectedPage" : ""}
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <GrNext onClick={nextPage}>앞으로</GrNext>
      </div>
    </div>
  );
}

export default ClubCategory;
