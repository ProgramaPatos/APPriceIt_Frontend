import React from 'react';
import { SideMenuCard } from '../../types/types'
import { SideBarMenuCardViewSty, Profile, ProfileInfo, Name , Title  } from '../../styledComponets/MenuCardStyle';


interface SideBarMenuCardViewProps {
    card: SideMenuCard;
    isOpen: boolean;
}

export default function SideBarMenuCardView({card, isOpen}: SideBarMenuCardViewProps ){
    return (
        <SideBarMenuCardViewSty>
            <Profile src= {card.photoURL} alt="profile"  width="100%"/>
            <ProfileInfo className={ isOpen? '' : 'collapsed'}>
                <Name >{card.displayName}</Name>
                <Title >{card.title}</Title>

            </ProfileInfo>
        </SideBarMenuCardViewSty>
    )
}