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
