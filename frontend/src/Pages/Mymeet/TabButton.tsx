import "./TabButton.css";

interface TabButtonProps {
  title: string;
  onSelect: () => void;
}

function TabButton({ title, onSelect }: TabButtonProps): JSX.Element {
  return (
    <menu onClick={onSelect} className="tabButtonBox">
      <li className="buttonList">
        <div>
          <button className="tabButtonTitle" onClick={onSelect}>
            {title}
          </button>
        </div>
      </li>
    </menu>
  );
}

export default TabButton;
