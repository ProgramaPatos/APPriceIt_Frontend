import React from "react";
import { SideMenuCard } from "../../../types/types";
import {
  SideBarMenuCardViewSty,
  Profile,
  ProfileInfo,
  Name,
  Title,
} from "./MenuCardStyle.style";

interface SideBarMenuCardViewProps {
  card: SideMenuCard;
  isOpen: boolean;
}

export default function SideBarMenuCardView({
  card,
  isOpen,
}: SideBarMenuCardViewProps) {
  return (
    <SideBarMenuCardViewSty>
      <img className="Profile" src={card.photoURL} alt="profile" width="100%" />
      <div className="ProfileInf" o className={isOpen ? "" : "collapsed"}>
        <Name>{card.displayName}</Name>
        <Title>{card.title}</Title>
      </div>
    </SideBarMenuCardViewSty>
  );
}
