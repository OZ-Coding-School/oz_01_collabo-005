import "./index.css";
import MoveImages from "./Moveimages";
import CategoryBox from "./Categoryicons";
import NewPost from "./Newpost";

function Main() {
  return (
    <div className="mainContainer">
      <div className="newPostContainer">
        <NewPost />
        <CategoryBox />
        <MoveImages />
      </div>
    </div>
  );
}

export default Main;
