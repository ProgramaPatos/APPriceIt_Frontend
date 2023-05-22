import { SideBarMenuItem, SideMenuCard } from "../../../types/types";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import SideBarMenuCardView from "../MenuCard/SideBarMenuCardView";
import SideBarMenuItemView from "../MenuItem/SideBarMenuItemView";
import "./SideBarMenu.scss";
import { RiFolderHistoryLine } from "react-icons/ri";
import { BsBookmark, BsClockHistory } from "react-icons/bs";

interface SideBarMenuProps {
  card: SideMenuCard;
  viewPanel: boolean;
  setViewPanel: (value: boolean) => void;
}

export function SideBarMenu({
  card,
  viewPanel,
  setViewPanel,
}: SideBarMenuProps) {
  const [isOPen, setIsOpen] = useState<boolean>(false);

  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Tiendas Registradas",
      icon: BsBookmark,
      url: "/",
    },

    {
      id: "2",
      label: "Búsquedas Recientes",
      icon: BsClockHistory,
      url: "/",
    },
    {
      id: "3",
      label: "Crear Tienda",
      icon: RiFolderHistoryLine,
      url: "/stores", //TODO: Change this or make it functional
    },
  ];

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
        <button className="BurgerButton" onClick={handleClick}>
          {isOPen || viewPanel ? (
            <AiOutlineClose style={{ height: "2.7vh", width: "100%" }} />
          ) : (
            <HiMenu style={{ height: "2.7vh", width: "100%" }} />
          )}
        </button>
      </div>
      {/* <SideBarMenuCardView card={card} isOpen={isOPen || viewPanel} /> */}
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
