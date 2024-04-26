import "./NoticeBoard.css";
import NoticeBox from "./NoticeBox";

function NoticeBoard({ feedData }: { feedData: any }) {
  // 만약 feedData나 feedData.results가 없다면 null을 반환하여 컴포넌트를 렌더링하지 않습니다.
  if (!feedData || !feedData.results || feedData.results.length === 0) {
    return <div className="noFeed">게시글이 없습니다.</div>;
  }
  // 결과를 매핑하여 여러 개의 NoticeBox 생성
  const noticeBoxes = feedData.results.map((result, index) => (
    <NoticeBox key={index} result={result} />
  ));
  return <div className="noticeBoard">{noticeBoxes}</div>;
}

export default NoticeBoard;
