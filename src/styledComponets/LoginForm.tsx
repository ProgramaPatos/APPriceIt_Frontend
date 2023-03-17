import styled from "styled-components";

export const LoginBack = styled.div`
display: flex;
flex-direction: column;
align-items: center;

padding: 30px;
background-color: #F6F1F1;
width: 30%;
border: 1px solid #F6F1F1;
height: 70%;
border-radius: 10px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-10%, -50%);
`
export const SimpleSeparator = styled.div`
position: relative;
width: 100%;
height: 20px;
background-color: transparent;
`
export const Border = styled.div`
position: absolute;
width: 60%;
height: 70%;
top: 50%;
background-color: transparent;
left: 50%;
transform: translate(-60%, -50%);
border-radius: 10px;
border: 10px solid #F6F1F1;
`

export const Tittle = styled.h1`
margin-top: 20px;
font-size: 40px;
color: #2C3333;
font-weight: 500;
font-family: 'Roboto', sans-serif;
`

export const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
margin: 16px 0px;
width: 100%;
height: 40px;
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
    margin: 0px;

    font-size: 20px;
    color: #2C3333;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
`

