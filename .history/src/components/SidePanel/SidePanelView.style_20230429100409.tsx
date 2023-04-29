import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const SidePanelView = styled.div`

background-color: ${darkMain};

position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;

&.expanded {
    width: 20rem;
}

&.collapsed {
    overflow: hidden;
    width: 0rem;
}
`

export const MenuButton = styled.div`
display: flex;
margin-top: 0.5rem;
justify-content: flex-end;
`

export const BurgerButton = styled.button`
cursor: pointer;
border: none;
background-color: transparent;
color: white;
padding: 0.7rem;
width: 4.1rem;
`
