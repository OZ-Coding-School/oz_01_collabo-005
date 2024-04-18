import "./Home.css";

function Home({ button }: { button: React.ReactNode }) {
  return (
    <div className="meetingHomeScreen">
      <div className="meetingIntroBox">
        <h3 className="introTitle">소개</h3>
        <div className="meetIntroduce">
          세종시에 사는 개발자들이 모여 개발에 대한 이야기를 하는 모임입니다.
        </div>
      </div>
      {button}
    </div>
  );
}
export default Home;
