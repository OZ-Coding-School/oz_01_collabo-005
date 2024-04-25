import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./Moveimages.css";

function MoveImages({ club, setClub }) {
  // const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgHover, setImgHover] = useState(false);
  //현재 인덱스넘버,이미지 호버

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === club.length - 4 ? 0 : prevIndex + 1,
    );
    setImgHover(true);
  };
  //다음 이미지 넘기는 것
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? club.length - 4 : prevIndex - 1,
    );
    setImgHover(true);
  };
  //서버에서 정보받기
  // useEffect(() => {
  //   async function newPosts() {
  //     try {
  //       const response = await instance.get("api/clubs/");
  //       setClub(response.data.results);
  //     } catch (error) {
  //       console.log("Error fetching", error);
  //     }
  //   }
  //   newPosts();
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!imgHover)
        setCurrentIndex((prevIndex) =>
          prevIndex === club.length - 4 ? 0 : prevIndex + 1,
        );
      setImgHover(true);
    }, 3000);
    // useEffect의 반환 함수를 사용하여 컴포넌트가 unmount 될 때 interval을 정리합니다.
    return () => clearInterval(intervalId);
  }, [imgHover]); // useEffect를 한 번만 실행하도록 빈 배열을 전달합니다.

  return (
    <div>
      <div
        className="carouselBox"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <div className={`imageCarousel ${imgHover ? "show-buttons" : ""}`}>
          {Array.isArray(club) &&
            club
              .slice(currentIndex, currentIndex + 4)
              .map((clubName, index) => (
                <div className="imageBox" key={index}>
                  <img
                    src={
                      clubName.image
                        ? clubName.image
                        : import.meta.env.VITE_ICON
                    }
                    alt="carousel"
                  />
                  <div className="reviewTitle ">{clubName.name}</div>
                  <Link to={`/meetHome/${clubName.id}`} className="review">
                    모임가기
                  </Link>
                </div>
              ))}
          <GrPrevious
            style={{ width: "20px", height: "60px" }}
            className="prev-button"
            onClick={prevSlide}
          />
          <GrNext
            style={{ width: "20px", height: "60px" }}
            className="next-button"
            onClick={nextSlide}
          />
        </div>
      </div>
    </div>
  );
}

export default MoveImages;
