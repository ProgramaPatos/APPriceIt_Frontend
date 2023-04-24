import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const SideBarMenuItemStyle = styled.div`
text-align: left;
display: flex;
align-items: center;
margin: 0rem 0.4rem;


&:hover{
    background-color: ${darkSecondary};
    color:  white;
    border-radius: 1rem;

}
&:hover{
    & + .toolTip {
        display: inline-block;
        animation-duration: 0.4s ;
        animation-name: toolTip;
    }
}
`
export  const ItemContent = styled.div`
display: flex;
flex-direction: row;
align-items: center;
overflow: hidden;
width: 100%;
white-space: nowrap;


&.collapsed {
    width: 2.2rem;
`

export const Icon = styled.div`
width: 2rem;
        height: 2rem;
`
export const Label = styled.span`
        font-weight: 500;
        margin-left: 0.7rem;
        overflow: hidden;
`

export const ToolTip = styled.div`
position: absolute;
background-color: black;
color: white;
left: -5rem;
padding: 10%;
border-radius: 0.5rem;
text-transform: capitalize;
display: none;

@keyframes toolTip {
    from {opacity: 0;}
    to {opacity: 1;}
}
`
export const A = styled.a`
color : white;
text-decoration: none;
display: block;
padding: 0.7rem;
width: 100%;
border-radius: 0.5rem;
`

