import "./NoticeBoard.css";
import NoticeBox from "./NoticeBox";

function NoticeBoard({ button }: { button: React.ReactNode }) {
  return (
    <div>
      <NoticeBox />
      <NoticeBox />
      <NoticeBox />
      {button}
    </div>
  );
}
export default NoticeBoard;
