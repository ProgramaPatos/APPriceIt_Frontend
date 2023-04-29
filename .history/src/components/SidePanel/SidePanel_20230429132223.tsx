import { SidePanelView, MenuButton, BurgerButton } from "./SidePanelView.style";
import "./SidePanel.scss";
import { ImCross } from "react-icons/im";
import Tienda from "../Store/Store";
interface SidePanelProps {
  viewPanel: boolean;
  setViewPanel: (value: boolean) => void;
}
function SidePanel({ viewPanel, setViewPanel }: SidePanelProps) {
  const handleClick = (): void => {
    setViewPanel(!viewPanel);
  };

  return (
    <div className={`SidePanelView ${viewPanel ? "expanded" : "collapsed"}`}>
      <div className="MenuButton">
        <button className="BurgerButton" onClick={handleClick}>
          <ImCross />
        </button>
      </div>
      <Tienda />
    </div>
  );
}

export default SidePanel;
