import { useRef } from "react";
import styled, { css } from "styled-components";
import { Inter_24_700 } from "../../../styles/text";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import { smcss } from "../../../styles/responsive";
import { bg_theme500, w_full } from "../../../styles/tailwindcss";
import { useIsDark } from "../../../utils/hooks";
import LidoSearchInputOrigin from "../searchInput";

const LidoSearchInput = styled(LidoSearchInputOrigin)`
  ${w_full};
`;

const SearchButton = styled(Button)`
  ${(p) => p.dark && bg_theme500};
`;

const Wrapper = styled(Flex)`
  width: 644px;
  position: relative;
  gap: 16px;

  ${smcss(w_full)};
  ${smcss(css`
    flex-wrap: wrap;

    input,
    button {
      flex-basis: 100%;
    }
  `)}
`;

const Title = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  color: ${(props) => props.theme.fontPrimary};
`;

export default function LidoSearch() {
  const searchRef = useRef();
  const isDark = useIsDark();

  function handleSearch() {
    searchRef.current.handleExplore();
  }

  return (
    <div>
      <Title>Lido Explorer</Title>
      <Wrapper>
        <LidoSearchInput ref={searchRef} />
        <SearchButton dark={isDark} onClick={handleSearch}>
          Explore
        </SearchButton>
      </Wrapper>
    </div>
  );
}
