import styled from 'styled-components';
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const HeaderStyle = styled.div`
    display: flex;

    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-45%);
    justify-content:  space-around;
    align-items: center;
    padding: 0 20px;
    background-color: #transparent;
    
    border-radius: 8px;
    height: 80px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);

`