import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../Apis/axios";
import "./Newpost.css";

function NewPost() {
  const [club, setClub]: any = useState([]);

  useEffect(() => {
    async function newPosts() {
      try {
        const response = await instance.get("api/clubs/");
        setClub(response.data.results);
      } catch (error) {
        console.log("Error fetching", error);
      }
    }
    newPosts();
  }, []);

  // const currentClub = club.sort((a, b) => b.id - a.id);
  return (
    <div className="">
      <div className="clubCategoryBox">
        {Array.isArray(club) &&
          club.slice(0, 6).map((clubName, index) => (
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
                <div className="ageGroup">
                  {clubName.age_group.map((age, index) => (
                    <div key={index}>
                      {index === clubName.age_group.length - 1
                        ? age + "0"
                        : age + "0,"}
                    </div>
                  ))}
                  <div>대</div>
                </div>
                <div>{clubName.updated_at.slice(0, 10)}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default NewPost;
