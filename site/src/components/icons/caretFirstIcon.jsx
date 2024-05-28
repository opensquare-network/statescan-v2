import styled from "styled-components";
import { ReactComponent as CaretFirst } from "./caret-first.svg";

const CaretFirstIcon = styled(CaretFirst)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default CaretFirstIcon;
