import { SideBarMenuItem, SideMenuCard } from '../types/types'
import { useState } from 'react'
import {classNames} from '../utils/classes'
import {HiMenu} from 'react-icons/hi'
import SideBarMenuCardView from './SideBarMenuCardView'
import SideBarMenuItemView from './SideBarMenuItemView'
import './scssStyles/SideBarMenu.scss'


interface SideBarMenuProps {
    items: SideBarMenuItem[];
    card: SideMenuCard;

}

export function SideBarMenu({items, card}: SideBarMenuProps)   {
    const [isOPen, setIsOpen] = useState<boolean>(false)

    const handleClick = ():void => {
        setIsOpen(!isOPen)
    }

    return (
        <div className={classNames('SideBarMenu', isOPen? 'expanded' : 'collapsed')}> 
            <div className = "menuButton">
               <button className='burgerButton' onClick={handleClick} >
                    <HiMenu/>
               </button>

            </div>
            <SideBarMenuCardView card={card}  isOpen= {isOPen}/>
                {items.map((item) => (
                    <SideBarMenuItemView item={item} key={item.id} isOpen= {isOPen}/>
                ))}

        </div>
    )


}