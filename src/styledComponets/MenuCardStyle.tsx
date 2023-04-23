import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const SideBarMenuCardViewSty = styled.div`
text-align: center;
`
export const Profile = styled.img`
border-radius: 50%;
padding: 10px;
box-sizing: border-box;
max-width: 150px;
`

export const ProfileInfo = styled.div`
overflow: hidden;
height: 80px;

&.collapsed {
    opacity: 0;
    height: 0;
}
`

export const Name = styled.div`
font-size: 1.5em;
font-weight: 600;
margin: 0;
padding: 0;
`
export const Title = styled.div`
font-size: 1em;
font-weight: 400;
margin: 0;
padding: 0;

`
