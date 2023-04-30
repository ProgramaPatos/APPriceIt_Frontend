import "./Profile.scss";
import { SideMenuCard } from "../../types/types";

interface ProfileProps {
  card: SideMenuCard;
}

export default function Profile({ card }: ProfileProps) {
  return (
    <div className="Profile">
      <img className="Profile" src={card.photoURL} alt="profile" width="100%" />
      <div className="ProfileInfo">
        <div className="Name">{card.displayName}</div>
        <div className="Title">{card.title}</div>
      </div>
    </div>
  );
}
