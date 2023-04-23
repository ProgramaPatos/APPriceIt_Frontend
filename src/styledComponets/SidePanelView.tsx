import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const SidePanelView = styled.div`

background-color: #222;

position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

&.expanded {
    width: 300px;
}

&.collapsed {
    overflow: hidden;
    width: 0px;
}

`

export const MenuButton = styled.div`
display: flex;
margin-top: 5px;
justify-content: flex-end;

`

export const BurgerButton = styled.button`
cursor: pointer;
border: none;
background-color: transparent;
color: white;
padding: 10px;
width: 68px;
`
