import { SideBarMenuItem } from "../../types/types";
import {
  SideBarMenuItemStyle,
  ItemContent,
  A,
  Icon,
  Label,
  ToolTip,
} from "../../styledComponets/MenuItenStyle.style";

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
    <SideBarMenuItemStyle>
      <A href="{item.url}">
        <ItemContent className={isOpen ? "" : "collapsed"}>
          <Icon>
            <item.icon size="32" />
          </Icon>
          <Label>{item.label}</Label>
        </ItemContent>
      </A>
      {isOpen ? " " : <ToolTip>{item.label} </ToolTip>}
    </SideBarMenuItemStyle>
  );
}
