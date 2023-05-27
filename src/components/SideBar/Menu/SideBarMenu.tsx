import { SideBarMenuItem, SideMenuCard } from "../../../types/types";
import { useContext, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import SideBarMenuCardView from "../MenuCard/SideBarMenuCardView";
import SideBarMenuItemView from "../MenuItem/SideBarMenuItemView";
import "./SideBarMenu.scss";
import { RiFolderHistoryLine } from "react-icons/ri";
import { BsBookmark, BsClockHistory } from "react-icons/bs";
import { ReactComponent as Logo } from "../../../Img/logo_appriceit.svg";
import { Icon, SvgIcon } from "@mui/material";
import { SideBarContext } from "../../GenericSideBar/GenericSideBar";
import { CreateStore } from "../../CreateStore/CreateStore";
import { AllStores } from "../../AllStores/AllStores";

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
  const setSideBar = useContext(SideBarContext);

  const items: SideBarMenuItem[] = [
    {
      id: "1",
      label: "Tiendas Registradas",
      icon: (
        <BsBookmark size="2.4vh" style={{ display: "block", margin: "auto" }} />
      ),
      url: "/",
      onClick: () => {
        setSideBar(AllStores);
      },
    },

    {
      id: "2",
      label: "Búsquedas Recientes",
      icon: (
        <BsClockHistory
          size="2.4vh"
          style={{ display: "block", margin: "auto" }}
        />
      ),
      url: "/",
      onClick: () => {},
    },
    {
      id: "3",
      label: "Crear Tienda",
      icon: (
        <RiFolderHistoryLine
          size="2.4vh"
          style={{ display: "block", margin: "auto" }}
        />
      ),
      url: "/stores", //TODO: Change this or make it functional
      onClick: () => {
        setSideBar(CreateStore);
      },
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
      <SideBarMenuItemView
        item={{
          id: "-1",
          label: "logo",
          icon: <Logo width={30} height={30} />,
          url: "/",
          onClick: () => {},
        }}
        key={"-1"}
        isOpen={isOPen || viewPanel}
      />
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
