import { SideBarMenuItem } from "../../../types/types";
import {
  SideBarMenuItemStyle,
  ItemContent,
  A,
  Icon,
  Label,
  ToolTip,
} from "./MenuItenStyle.style";

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
      <A href="{item.url}">
        <div className={`ItemContent ${isOpen ? "" : "collapsed"}`>
          <Icon>
            <item.icon size="32" />
          </Icon>
          <Label>{item.label}</Label>
        </div>
      </A>
      {isOpen ? " " : <ToolTip>{item.label} </ToolTip>}
    </div>
  );
}
