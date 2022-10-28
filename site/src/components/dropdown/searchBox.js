import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

const SearchBoxWrapper = styled(Flex)`
  height: 52px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBox};
  input {
    all: unset;
    padding: 8px 12px;
    color: ${(p) => p.theme.fontTertiary};
    ${Inter_14_500};
  }
`;

const SearchBox = ({ searchText, isSearch, setSearchText, name }) => {
  if (!isSearch) {
    return null;
  }
  return (
    <SearchBoxWrapper>
      <input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder={`Search of ${name}...`}
      />
    </SearchBoxWrapper>
  );
};

export default SearchBox;
