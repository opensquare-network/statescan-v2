import styled, { css } from "styled-components";
import { Inter_24_700 } from "../../../styles/text";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSelector } from "../../../store/reducers/settingSlice";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import { homeSearchHints } from "../../../services/urls";
import { mobileCss } from "../../../utils/mobileCss";
import ExploreDropdown from "./dropdown";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { makeExploreDropdownItemRouteLink } from "./utils";
import InputOrigin from "../../../components/input";
import SearchIcon from "../../icons/searchIcon";
import LoadingInlineAnimationIcon from "../../icons/loadingInlineAnimationIcon";

const Input = styled(InputOrigin)`
  width: 545px;

  ${mobileCss(css`
    width: 100%;
  `)}
`;

const Wrapper = styled(Flex)`
  position: relative;
  gap: 16px;

  ${mobileCss(css`
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

const hintsCache = {};

export default function Explore() {
  const navigate = useNavigate();
  const chain = useSelector(chainSelector);
  const [term, setTerm] = useState("");
  const [hints, setHints] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingHints, setLoadingHints] = useState(false);

  const selectedItem = useMemo(() => {
    if (dropdownVisible) {
      return hints[selectedIndex];
    }

    return hints[0];
  }, [selectedIndex, hints, dropdownVisible]);

  // FIXME: see https://github.com/opensquare-network/statescan-v2/issues/196
  async function fetchHints(term) {
    setLoadingHints(true);
    return api
      .fetch(homeSearchHints, { term })
      .then(({ result }) => {
        const data = compatExploreDropdownHints(result);

        if (data.length) {
          hintsCache[term] = data;
          setHints(data);
        } else {
          setHints([]);
        }
      })
      .finally(() => {
        setLoadingHints(false);
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchHints = useCallback(debounce(fetchHints, 500), []);

  useEffect(() => {
    if (!term) {
      setDropdownVisible(false);
      setHints([]);
      return;
    }

    if (hintsCache[term]) {
      setHints(hintsCache[term]);
    } else {
      debouncedFetchHints(term);
    }
  }, [term, debouncedFetchHints]);

  useEffect(() => {
    setDropdownVisible(!!hints?.length);
  }, [hints]);

  function onInput(e) {
    setTerm(e.target.value);
  }

  function onFocus() {
    if (hints.length) {
      setDropdownVisible(true);
    }
  }

  function onBlur() {
    setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  }

  function onInputKeyDown(event) {
    if (!dropdownVisible) {
      return;
    }

    const { code } = event;

    if (code === "Enter") {
      handleExplore();
    } else if (code === "ArrowUp") {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (code === "ArrowDown") {
      if (selectedIndex < hints.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    }
  }

  function handleExplore() {
    const { type, value } = selectedItem;
    navigate(makeExploreDropdownItemRouteLink(type, value));
  }

  return (
    <div>
      <Title>{chain} Explorer</Title>
      <Wrapper style={{ gap: 16 }}>
        <Input
          placeholder={"Block / Address / Extrinsic /..."}
          onChange={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onInputKeyDown}
          prefix={<SearchIcon />}
          suffix={loadingHints && <LoadingInlineAnimationIcon />}
        />

        <Button onClick={handleExplore}>Explore</Button>

        <ExploreDropdown
          hints={hints}
          visible={dropdownVisible}
          selectedIndex={selectedIndex}
        />
      </Wrapper>
    </div>
  );
}
