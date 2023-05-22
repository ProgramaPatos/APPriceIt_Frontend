import { ReactElement } from "react";
import { IconType } from "react-icons";

export interface SideBarMenuItem {
  id: string;
  label: string;
  icon: ReactElement;
  url: string;
}

export interface SideMenuCard {
  id: string;
  displayName: string;
  photoURL: string;
  title: string;
  url: string;
}
