import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./index.css";

function Meet() {
  return (
    <div className="meet">
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="나의 일정">
          나의 일정
        </Tab>
        <Tab eventKey="profile" title="나의 모임">
          <div className="MyMFcontainer">
            <div className="showMyMeet">
              {" "}
              {/* 내 모임이 무엇이 있는지 하나,하나 컴포넌트 */}
              <h4>나의 모임</h4>
              <img
                src="https://cdn.pixabay.com/photo/2023/12/17/20/31/car-8454879_1280.jpg"
                width={69}
                className="meetPicture"
              />
              <p>영화 모임</p>
            </div>
            <div className="showMyFeed">
              <div className="feedTitleBox">
                <h4 className="titleFeed">피드</h4>
              </div>
              <div className="FeedArticleBox">
                {" "}
                {/* 피드 -컴포넌트*/}
                <div>
                  <img
                    src="https://cdn.pixabay.com/photo/2023/12/17/20/31/car-8454879_1280.jpg"
                    width={73}
                    height={73}
                    className="meetPicture"
                  />
                  <div className="feedInformation">
                    <h6>영화 모임</h6>
                    <span>작성자이름</span> <span>작성일시</span>
                  </div>{" "}
                </div>
                <div>
                  <p>안녕하세요 잘 부탁드립니다.</p>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Meet;
