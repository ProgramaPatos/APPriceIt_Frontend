import styled from "styled-components";
import { paleteColors } from "../../utils/colors";

const [lightMain, lightSecondary, neutral, darkSecondary, darkMain] =
  paleteColors();
export const LoginBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.7rem;
  background-color: ${lightSecondary};
  width: 30%;
  border: 0.1rem solid ${lightSecondary};
  height: 70%;
  border-radius: 0.7rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-10%, -50%);
`;
export const Border = styled.div`
  position: absolute;
  width: 60%;
  height: 70%;
  top: 50%;
  background-color: transparent;
  left: 50%;
  transform: translate(-60%, -50%);
  border-radius: 0.7rem;
  border: 0.7rem solid ${lightSecondary};
`;

export const Tittle = styled.h1`
  margin-top: 1.2rem;
  font-size: 2.5rem;
  color: #2c3333;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 0rem;
  width: 100%;
  height: 3.2rem;
  border-radius: 0.5rem;
  background-color: #2c3333;
  color: ${lightMain};
  font-size: 1.2rem;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #f6f1f1;
    color: #2c3333;
    border: 0.1rem solid #2c3333;
  }
`;
