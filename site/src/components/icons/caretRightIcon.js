import styled from "styled-components";
import { ReactComponent as CaretRight } from "./caret-right.svg";

const CaretRightIcon = styled(CaretRight)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default CaretRightIcon;
