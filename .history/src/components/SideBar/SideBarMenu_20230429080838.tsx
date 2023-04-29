import { SideBarMenuItem, SideMenuCard } from "../../types/types";
import { useState } from "react";

import SideBarMenuCardView from "./SideBarMenuCardView";
import SideBarMenuItemView from "./SideBarMenuItemView";
import {
  MenuDisplay,
  BurgerButton,
  MenuButton,
} from "../../styledComponets/SideBarMenuStyle";
import "../scssStyles/SideBarMenu.scss";

interface SideBarMenuProps {
  items: SideBarMenuItem[];
  card: SideMenuCard;
}

export function SideBarMenu({ items, card }: SideBarMenuProps) {
  const [isOPen, setIsOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen(!isOPen);
  };

  return (
    <MenuDisplay className={isOPen ? "expanded" : "collapsed"}>
      <MenuButton>
        <BurgerButton onClick={handleClick}>HiMenu-react</BurgerButton>
      </MenuButton>
      <SideBarMenuCardView card={card} isOpen={isOPen} />
      {items.map((item) => (
        <SideBarMenuItemView item={item} key={item.id} isOpen={isOPen} />
      ))}
    </MenuDisplay>
  );
}
