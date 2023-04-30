import "./Profile.scss";
import { SideMenuCard } from "../../types/types";
import { useState } from "react";

interface ProfileProps {
  card: SideMenuCard;
}

export default function Profile({ card }: ProfileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="ProfileContainer">
      <img className="Profile" src={card.photoURL} alt="profile" width="100%" />
      <div
        className="ProfileInfo"
        style={{ display: isOpen ? "none" : "block" }}
      >
        <div className="Name">{card.displayName}</div>
        <div className="Title">{card.title}</div>
      </div>
    </div>
  );
}