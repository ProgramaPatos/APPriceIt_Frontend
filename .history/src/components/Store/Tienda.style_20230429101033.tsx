import styled from "styled-components";
import { paleteColors } from "../utils/colors";

const [lightMain, lightSecondary, neutral, darkSecondary, darkMain] =
  paleteColors();
export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  align-items: center;
  justify-content: center;
  translate: translate(-50%, -50%);

  width: 100%;
`;

export const Buttons = styled.button`
  background-color: ${lightMain};
  border: none;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.3rem 0.2rem;
  cursor: pointer;
  border-radius: 0.8rem;
  width: 70%;
  height: 4rem;
  margin-top: 0.5rem;
`;
