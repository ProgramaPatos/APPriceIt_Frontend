import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const SideBarMenuCardViewSty = styled.div`
text-align: center;
`
export const Profile = styled.img`
border-radius: 50%;
padding: 0.7rem;
box-sizing: border-box;
max-width: 9.4rem;
`

export const ProfileInfo = styled.div`
overflow: hidden;
height: 5rem;

&.collapsed {
    opacity: 0;
    height: 0;
}
`

export const Name = styled.div`
font-size: 1.5rem;
font-weight: 600;
margin: 0;
padding: 0;
`
export const Title = styled.div`
font-size: 1rem;
font-weight: 400;
margin: 0;
padding: 0;

`
