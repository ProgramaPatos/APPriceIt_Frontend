import styled from "styled-components";

export const FormBack = styled.div`

display: flex;
flex-direction: column;
align-items: center;

padding: 30px;
background-color: #F6F1F1;
width: 52%;
height: 70%;
border-radius: 10px;
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
    gap: 20px;
    margin-top: 20px;
`


export const Title = styled.h1`
 grid-column: 2/4;
 grid-row: 1;
 margin-top: 20px;
 font-size: 40px;
 color: #2C3333;
 font-weight: 500;
 font-family: 'Roboto', sans-serif;
 `

export const Button = styled.button`
    margin-top: 40px;
    width: 70%;
    height: 50px;
    border-radius: 5px;
    background-color: #2C3333;
    color: #F6F1F1;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background-color: #F6F1F1;
        color: #2C3333;
        border: 2px solid #2C3333;
    }
`


export const Text = styled.p`
    margin-top: 50px;
    font-size: 20px;
    color: #2C3333;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
`
