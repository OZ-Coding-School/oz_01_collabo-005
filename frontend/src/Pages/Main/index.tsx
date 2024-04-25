import { useEffect, useState } from "react";
import instance from "../../Apis/axios";
import CategoryBox from "./Categoryicons";
import MoveImages from "./Moveimages";
import NewPost from "./NewPost";
import "./index.css";

function Main() {
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

  return (
    <div className="mainContainer">
      <div className="newPostContainer">
        <NewPost club={club} setClub={setClub} />
        <CategoryBox />
        <MoveImages club={club} setClub={setClub} />
      </div>
    </div>
  );
}

export default Main;
