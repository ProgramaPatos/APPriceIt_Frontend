import { IconType } from "react-icons";

export interface SideBarMenuItem {
  id: string;
  label: string;
  icon: IconType;
  url: string;
}

export interface SideMenuCard {
  id: string;
  displayName: string;
  photoURL: string;
  title: string;
  url: string;
}

export interface StoreApi {
  store_location: {
    type: string;
    coordinates: number[];
  };
  store_id: number;
  store_name: string;
  store_description: string;
  store_schedule: string;
  store_creation_time: string;
  store_appuser_id: number;
  store_distance: number;
}
