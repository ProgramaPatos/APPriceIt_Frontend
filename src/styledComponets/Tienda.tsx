import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    translate : translate(-50%, -50%);

    width: 100%;

`;

export const Buttons = styled.button`

    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;    
    width: 70%;
    height: 50px;
    margin-top: 10px;
    
`;