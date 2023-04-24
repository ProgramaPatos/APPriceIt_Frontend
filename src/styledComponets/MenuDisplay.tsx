import styled from 'styled-components';
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const MenuDisplay = styled.div`
    position: absolute;
    display: flex;
    top: 2rem;
    left: 1.5rem;
    width: 3rem;
    justify-content: center;
    align-items: center;

    height: 3rem;
    background-color: #red;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.1rem 0.2rem -0.1rem rgba(0,0,0,0.2), 0rem 0.2rem 0.4rem 0rem rgba(0,0,0,0.14), 0rem 0.1rem 0.7rem 0rem rgba(0,0,0,0.12);

`
