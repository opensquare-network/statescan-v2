import styled from "styled-components";
import { ReactComponent as CaretLeft } from "./caret-left.svg";

const CaretLeftIcon = styled(CaretLeft)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default CaretLeftIcon;
