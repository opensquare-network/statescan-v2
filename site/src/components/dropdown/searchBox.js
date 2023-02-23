import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

const SearchBoxWrapper = styled(Flex)`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  padding-bottom: 8px;
  input {
    all: unset;
    width: 100%;
    padding: 8px 12px;
    color: ${(p) => p.theme.fontPrimary};
    ::placeholder {
      color: ${(p) => p.theme.fontTertiary};
    }

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
