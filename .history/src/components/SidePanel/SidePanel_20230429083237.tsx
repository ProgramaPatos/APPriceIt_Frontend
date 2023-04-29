import {
  SidePanelView,
  MenuButton,
  BurgerButton,
} from "../../styledComponets/SidePanelView";
import { ImCross } from "react-icons/im";
import Tienda from "../Tienda";
interface SidePanelProps {
  viewPanel: boolean;
  setViewPanel: (value: boolean) => void;
}
function SidePanel({ viewPanel, setViewPanel }: SidePanelProps) {
  const handleClick = (): void => {
    setViewPanel(!viewPanel);
  };

  return (
    <SidePanelView className={viewPanel ? "expanded" : "collapsed"}>
      <MenuButton>
        <BurgerButton onClick={handleClick}>
          <ImCross />
        </BurgerButton>
      </MenuButton>
      <Tienda />
    </SidePanelView>
  );
}

export default SidePanel;
