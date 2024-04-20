import "./Home.css";

function Home({ button, getData }: { button: React.ReactNode; getData: any }) {
  return (
    <div className="meetingHomeScreen">
      <div className="meetingIntroBox">
        <h3 className="introTitle">소개</h3>
        <div className="meetIntroduce">{getData.description}</div>
      </div>
      {button}
    </div>
  );
}
export default Home;
