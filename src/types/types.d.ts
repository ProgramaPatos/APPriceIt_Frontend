import { IconType } from "react-icons";

export interface  SideBarMenuItem {
    id:  string;
    label: string;
    icon :IconType
    url: string;

}


export interface SideMenuCard {
    id: string;
    displayName: string;
    photoURL: string;
    title: string;
    url: string;

}