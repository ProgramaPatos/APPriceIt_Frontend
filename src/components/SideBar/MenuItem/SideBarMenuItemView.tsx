import { SideBarMenuItem } from "../../../types/types";
import "./SideBarMenuItemView.scss";
interface SideBarMenuItemViewProps {
  item: SideBarMenuItem;
  isOpen: boolean;
}
//comentario prueba

export default function SideBarMenuItemView({
  item,
  isOpen,
}: SideBarMenuItemViewProps) {
  return (
    <div className="SideBarMenuItemStyle">
      <a className="A" href={item.url}>
        <div className={`ItemContent ${isOpen ? "expanded" : "collapsed"}`}>
          <div className="Icon">
            {item.icon}
          </div>
          <span className="Label">{item.label}</span>
        </div>
      </a>
      {isOpen ? " " : <div className="ToolTip">{item.label} </div>}
    </div>
  );
}
