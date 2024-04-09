import React from "react";
import "./index.css";
import NewPost from "./newpost";
import MoveImages from "./Moveimages";

function Main() {
  return (
    <div className="mainContainer">
      <div className="newPostContainer">
        <NewPost />
        <MoveImages />
      </div>
    </div>
  );
}

export default Main;
