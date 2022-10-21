import styled from "styled-components";
import { ReactComponent as Search } from "./search.svg";

const SearchIcon = styled(Search)`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

export default SearchIcon;
