import "./Profile.scss";
import { SideMenuCard } from "../../types/types";
import { useState } from "react";

interface ProfileProps {
  card: SideMenuCard;
}

const [isOPen, setIsOpen] = useState<boolean>(false);

export default function Profile({ card }: ProfileProps) {
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
