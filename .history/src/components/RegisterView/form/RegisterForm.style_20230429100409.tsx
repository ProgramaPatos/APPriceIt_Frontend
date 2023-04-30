import styled from "styled-components";
import { paleteColors } from '../utils/colors';

const [ lightMain , lightSecondary, neutral, darkSecondary, darkMain] = paleteColors();
export const FormBack = styled.div`

display: flex;
flex-direction: column;
align-items: center;

padding: 1.7rem;
background-color: ${lightSecondary};
width: 52%;
height: 70%;
border-radius: 0.7rem;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

`
export const Order= styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 6rem;
    margin-Bottom: 0.5rem;
    margin-top: 0.6rem;
`


export const Title = styled.h1`
 margin-top: 0.5rem;
 font-size: 2.5rem;
 color: #2C3333;
 font-weight: 500;
 font-family: 'Roboto', sans-serif;
 `

export const Button = styled.button`
    margin-top: 1.6rem;
    width: 70%;
    height: 4.2rem;
    border-radius: 0.5rem;
    background-color: #2C3333;
    color: #F6F1F1;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background-color: #F6F1F1;
        color: #2C3333;
        border: 0.1rem solid #2C3333;
    }
`


export const Text = styled.p`
    margin: 0rem;
    margin-top: 1rem;
    font-size: 1rem;
    color: #2C3333;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
`