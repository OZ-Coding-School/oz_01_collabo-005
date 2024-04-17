import { FaMountain } from "react-icons/fa";
import { MdOutlineSportsHandball } from "react-icons/md";
import { GiInnerSelf } from "react-icons/gi";
import { MdOutlineMenuBook } from "react-icons/md";
import { HiMiniMusicalNote } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiGame } from "react-icons/bi";
import { PiBabyBold } from "react-icons/pi";

function NewPost() {
  const posts = [
    {
      id: 1,
      title: "첫번쨰 포스트",
      content: "이것은 첫번쨰 포스트",
      date: "2024-04-01",
      img: "/public/pictures/main/ex0.jpeg",
    },
    {
      id: 2,
      title: "두번쨰 포스트",
      content: "이것은 두번쨰 포스트",
      date: "2024-04-02",
      img: "/public/pictures/main/ex0.jpeg",
    },
    {
      id: 3,
      title: "세번쨰 포스트",
      content: "이것은 세번쨰 포스트",
      date: "2024-04-32",
      img: "/public/pictures/main/ex0.jpeg",
    },
  ];
  return (
    <div>
      <div>
        {posts.map((post) => (
          <div className="newPostBox" key={post.id}>
            <img src={post.img} alt="포스트이미지" />
            <div className="postWriteBox">
              <div className="postTitle">{post.title}</div>
              <div className="postContent">{post.content}</div>
            </div>
          </div>
        ))}
        <div className="categoryBox">
          <div className="iconContainer">
            <a href="/hobby" className="iconBox">
              <BiGame className="icons" />
              <div>취미/오락</div>
            </a>
            <a href="/hobby" className="iconBox">
              <MdOutlineSportsHandball className="icons" />
              <div>운동</div>
            </a>

            <a href="/hobby" className="iconBox">
              <FaPeopleGroup className="icons" />
              <div>문화/예술</div>
            </a>
            <a href="/hobby" className="iconBox selfDevelop">
              <GiInnerSelf className="icons" />
              <div>자기계발</div>
            </a>
          </div>

          <div className="iconContainer">
            <a href="/hobby" className="iconBox family">
              <PiBabyBold className="icons" />
              <div>가족/육아</div>
            </a>
            <a href="/hobby" className="iconBox">
              <HiMiniMusicalNote className="icons" />
              <div>음악/악기</div>
            </a>
            <a href="/hobby" className="iconBox">
              <MdOutlineMenuBook className="icons" />
              <div>책/인문학</div>
            </a>
            <a href="/hobby" className="iconBox">
              <FaMountain className="icons" />
              <div>아웃도어</div>
            </a>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default NewPost;
