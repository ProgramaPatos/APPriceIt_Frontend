import styled from "styled-components";
import { paleteColors } from "../../../utils/colors";

const [lightMain, lightSecondary, neutral, darkSecondary, darkMain] =
  paleteColors();

export const MenuDisplay = styled.div`
  background-color: ${darkMain};

  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.expanded {
    width: 20rem;
  }

  &.collapsed {
    width: 4rem;
  }
`;
export const MenuButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BurgerButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
  padding: 0.7rem;
  width: 4.1rem;
`;
