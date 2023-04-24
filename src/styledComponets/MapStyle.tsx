import styled from 'styled-components';
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();


export const MapStyle = styled.div`
text-align: center;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: -1;
`

export const NavControl = styled.div`
 right: 96rem;
 `