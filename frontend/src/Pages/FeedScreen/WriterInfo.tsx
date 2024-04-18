import "./WriterInfo.css";
function WriterInfo({ paddingTop }) {
  return (
    <>
      <div className="landingUserBox" style={{ paddingTop }}>
        <div className="webUserInfo">
          <div className="landingUserImg">
            <img
              src="https://i.namu.wiki/i/G9ey-HFAbimbOE7iEYs-GQ108GtySNix3H9BD-YvPqcHYyIahrNxqamCqhYLsEl_2ws9HkZMXB5-N0Lg2nDtWchO9HeD0EDvOceVvq5ufBmVKWUM5oYMmM7lMF5UsJ_bP2mX_1pf4vHmweTVwe_bbA.webp"
              width={40}
              height={40}
            />
          </div>
          <div className="wrapWrittenBox">
            <div className="writtenBox">
              <p>userName</p>
            </div>
            <div>
              <span>작성일</span>
            </div>
          </div>{" "}
        </div>
      </div>{" "}
    </>
  );
}

export default WriterInfo;
