import React, { useEffect, useState } from "react";
import "./moveimages.css";
import { GrNext, GrPrevious } from "react-icons/gr";

function MoveImages() {
  const images = [
    "/pictures/Main/ex0.jpeg",
    "/pictures/Main/ex1.jpg",
    "/pictures/Main/ex2.jpg",
    "/pictures/Main/ex0.jpeg",
    "/pictures/Main/ex1.jpg",
    "/pictures/Main/ex2.jpg",
    "/pictures/Main/ex0.jpeg",
    "/pictures/Main/ex1.jpg",
    "/pictures/Main/ex2.jpg",
    "/pictures/Main/ex0.jpeg",
    "/pictures/Main/ex1.jpg",
    "/pictures/Main/ex2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgHover, setImgHover] = useState(false);
  //현재 인덱스넘버,이미지 호버

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 4 ? 0 : prevIndex + 1,
    );
    setImgHover(true);
  };
  //다음 이미지 넘기는 것
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 4 : prevIndex - 1,
    );
    setImgHover(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!imgHover)
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 4 ? 0 : prevIndex + 1,
        );
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
          {images.slice(currentIndex, currentIndex + 4).map((image, index) => (
            <div className="imageBox" key={index}>
              <img src={image} alt="carousel" />
              <a href={`www.link${index}.com`} className="review">
                리뷰보기
              </a>
            </div>
          ))}
          <GrPrevious className="prev-button" onClick={prevSlide} />
          <GrNext className="next-button" onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
}

export default MoveImages;
