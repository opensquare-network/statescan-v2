import styled from "styled-components";
import { ReactComponent as CaretLast } from "./caret-last.svg";

const CaretLastIcon = styled(CaretLast)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default CaretLastIcon;
