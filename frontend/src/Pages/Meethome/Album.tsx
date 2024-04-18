import "./Album.css";

function AlbumBox() {
  return (
    <div className="albumBox">
      <img
        className="albumImg"
        src="https://api.nudge-community.com/attachments/35176"
      />
    </div>
  );
}

function Album({ button }: { button: React.ReactNode }) {
  return (
    <div className="meetingAlbumBox">
      <div className="wrapAlbum">
        <AlbumBox />
        <AlbumBox />
        <AlbumBox />
      </div>
      <div className="wrapAlbum">
        {" "}
        <AlbumBox />
        <AlbumBox />
        <AlbumBox />
      </div>
      <div className="wrapAlbum">
        <AlbumBox />
        <AlbumBox />
        <AlbumBox />
      </div>
      {button}
    </div>
  );
}
export default Album;
