import { Link } from "react-router-dom";
import "./Newpost.css";
import { useEffect, useState } from "react";
import instance from "../../Apis/axios";

function NewPost() {
  const [club, setClub]: any = useState([]);

  useEffect(() => {
    async function newPosts() {
      try {
        const response = await instance.get("api/clubs/");
        setClub(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.log("Error fetching", error);
      }
    }
    newPosts();
    console.log(club);
  }, []);

  // const currentClub = club.sort((a, b) => b.id - a.id);
  return (
    <div className="">
      <div className="clubCategoryBox">
        {club.slice(0, 6).map((clubName, index) => (
          <Link
            to={`/meetHome/${clubName.id}`}
            className="newPostBox"
            key={index}
          >
            <img
              src={clubName.image ? clubName.image : import.meta.env.VITE_ICON}
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
    </div>
  );
}

export default NewPost;
