import styled from "styled-components";
import { ReactComponent as CaretDown } from "./caret-down.svg";

const CaretDownIcon = styled(CaretDown)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default CaretDownIcon;
