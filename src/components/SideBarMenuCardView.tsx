

import React from 'react';
import { SideMenuCard } from '../types/types'
import { classNames } from '../utils/classes';
import './scssStyles/SideBarMenuCardView.scss'


interface SideBarMenuCardViewProps {
    card: SideMenuCard;
    isOpen: boolean;
}




export default function SideBarMenuCardView({card, isOpen}: SideBarMenuCardViewProps ){
    return (
        <div className="SideBarMenuCardView">
            <img className='profile' src= {card.photoURL} alt="profile"  width="100%"/>
            <div className={classNames('profileInfo', isOpen? '' : 'collapsed')}>
                <div className="name">{card.displayName}</div>
                <div className="title">{card.title}</div>

            </div>
        </div>
    )
}