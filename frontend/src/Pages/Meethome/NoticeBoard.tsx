import "./NoticeBoard.css";
import NoticeBox from "./NoticeBox";

function NoticeBoard({
  button,
  feedData,
}: {
  button: React.ReactNode;
  feedData: any;
}) {
  return (
    <div>
      <NoticeBox feedData={feedData} />
      <NoticeBox feedData={feedData} />
      <NoticeBox feedData={feedData} />
      {button}
    </div>
  );
}
export default NoticeBoard;
