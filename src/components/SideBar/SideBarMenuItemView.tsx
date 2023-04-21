
import { SideBarMenuItem } from "../../types/types";
import { classNames } from "../../utils/classes";
import '../scssStyles/SideBarMenuItemView.scss'


interface SideBarMenuItemViewProps {
    item: SideBarMenuItem;
    isOpen: boolean;
}
//comentario prueba

export default function SideBarMenuItemView({item, isOpen}: SideBarMenuItemViewProps){
    return (
        <div className="SideBarMenuItem">
            <a href="{item.url}">
                <div className={classNames('ItemContent', isOpen? '' : 'collapsed')}>
                    <div className="icon">
                        <item.icon size="32" />    
                    </div>
                    <span className="label">{item.label}</span>   
                </div>

            </a>
            {isOpen? " ":  <div className="toolTip">{item.label} </div>  } 
        </div>
    )
}