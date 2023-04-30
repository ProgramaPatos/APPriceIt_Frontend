import { SideBarMenuItem, SideMenuCard } from "../../../types/types";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import SideBarMenuCardView from "../MenuCard/SideBarMenuCardView";
import SideBarMenuItemView from "../MenuItem/SideBarMenuItemView";
import "./SideBarMenu.scss";

interface SideBarMenuProps {
  items: SideBarMenuItem[];
  card: SideMenuCard;
  viewPanel: boolean;
}

export function SideBarMenu({ items, card, viewPanel }: SideBarMenuProps) {
  const [isOPen, setIsOpen] = useState<boolean>(viewPanel);

  const handleClick = (): void => {
    setIsOpen(!isOPen);
  };

  return (
    <div className={`MenuDisplay ${isOPen ? "expanded" : "collapsed"}`}>
      <div className="MenuButton">
        <button className="BurgerButton" onClick={handleClick}>
          <HiMenu />
        </button>
      </div>
      <SideBarMenuCardView card={card} isOpen={isOPen} />
      {items.map((item) => (
        <SideBarMenuItemView item={item} key={item.id} isOpen={isOPen} />
      ))}
    </div>
  );
}
