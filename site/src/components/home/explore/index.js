import styled, { css } from "styled-components";
import { Inter_24_700 } from "../../../styles/text";
import InputOrigin from "../../styled/input";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSelector } from "../../../store/reducers/settingSlice";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { homeSearchHints } from "../../../services/urls";
import { mobileCss } from "../../../utils/mobileCss";
import ExploreDropdown from "./dropdown";
import { useCallback } from "react";

const Input = styled(InputOrigin)`
  width: 545px;

  ${mobileCss(css`
    width: 100%;
  `)}
`;

const Wrapper = styled(Flex)`
  position: relative;
  gap: 16px;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
    input,
    button {
      flex-basis: 100%;
    }
  }
`;

const Title = styled.h1`
  all: unset;
  margin-bottom: 24px;
  display: block;
  ${Inter_24_700};
  text-transform: capitalize;
  color: ${(props) => props.theme.fontPrimary};
`;

function compatExploreDropdownHints(hints) {
  return Object.entries(hints).map((hint) => {
    const [type, value] = hint;
    return {
      type,
      value,
    };
  });
}

export default function Explore() {
  const chain = useSelector(chainSelector);
  const [value, setValue] = useState("");
  const [hints, setHints] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  async function fetchHints(term) {
    return api.fetch(homeSearchHints, { term }).then(({ result }) => {
      const data = compatExploreDropdownHints(result);

      if (data.length) {
        setDropdownVisible(true);
        setHints(data);
      }
    });
  }
  const debouncedFetchHints = useCallback(debounce(fetchHints, 500), []);

  useEffect(() => {
    if (!value) {
      setDropdownVisible(false);
      setHints([]);
      return;
    }

    debouncedFetchHints(value);
  }, [value]);

  function onInput(e) {
    setValue(e.target.value);
  }

  function onFocus() {
    if (hints.length) {
      setDropdownVisible(true);
    }
  }

  function onBlur() {
    setDropdownVisible(false);
  }

  return (
    <div>
      <Title>{chain} Explorer</Title>
      <Wrapper style={{ gap: 16 }}>
        <Input
          placeholder={"Block / Address / Extrinsic / Asset /..."}
          onChange={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Button>Explore</Button>

        <ExploreDropdown
          hints={hints}
          visible={dropdownVisible}
          setVisible={setDropdownVisible}
        />
      </Wrapper>
    </div>
  );
}
