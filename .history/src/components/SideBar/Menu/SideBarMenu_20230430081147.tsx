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
  setViewPanel: (value: boolean) => void;
}

export function SideBarMenu({
  items,
  card,
  viewPanel,
  setViewPanel,
}: SideBarMenuProps) {
  const [isOPen, setIsOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen(!isOPen);
    setViewPanel(false);
  };

  return (
    <div
      className={`MenuDisplay ${
        isOPen || viewPanel ? "expanded" : "collapsed"
      }`}
    >
      <div className="MenuButton">
        <button
          className="BurgerButton"
          onClick={handleClick}
          style={{ width: " 100%", height: "100%" }}
        >
          <HiMenu />
        </button>
      </div>
      <SideBarMenuCardView card={card} isOpen={isOPen || viewPanel} />
      {items.map((item) => (
        <SideBarMenuItemView
          item={item}
          key={item.id}
          isOpen={isOPen || viewPanel}
        />

        //TODO: add Store component here
        //<Tienda />
      ))}
    </div>
  );
}
