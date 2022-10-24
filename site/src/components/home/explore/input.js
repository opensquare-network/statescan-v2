import Input from "../../input";
import debounce from "lodash.debounce";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import api from "../../../services/api";
import { homeSearchHints } from "../../../services/urls";
import ExploreDropdown from "./dropdown";
import { useCallback } from "react";
import SearchIcon from "../../icons/searchIcon";
import LoadingInlineAnimationIcon from "../../icons/loadingInlineAnimationIcon";
import { makeExploreDropdownItemRouteLink } from "./utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMobileMenu } from "../../../store/reducers/mobileMenuSlice";

function compatExploreDropdownHints(hints) {
  return Object.entries(hints).map((hint) => {
    const [type, value] = hint;
    return {
      type,
      value,
    };
  });
}

function ExploreInput(props, ref) {
  useImperativeHandle(ref, () => ({ handleExplore }));

  const [term, setTerm] = useState("");
  const [hintsCache, setHintsCache] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingHints, setLoadingHints] = useState(false);

  const hints = useMemo(() => hintsCache[term] ?? [], [term, hintsCache]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          setHintsCache({
            ...hintsCache,
            [term]: data,
          });
        }
      })
      .finally(() => {
        setLoadingHints(false);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchHints = useCallback(debounce(fetchHints, 300), []);

  useEffect(() => {
    if (!term) {
      setDropdownVisible(false);
      return;
    }

    if (!hintsCache[term]) {
      debouncedFetchHints(term);
    }
  }, [term, debouncedFetchHints, hintsCache]);

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

  function handleExplore() {
    const { type, value } = selectedItem;
    navigate(makeExploreDropdownItemRouteLink(type, value));
    dispatch(closeMobileMenu());
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

  return (
    <>
      <Input
        placeholder={"Block / Address / Extrinsic /..."}
        {...props}
        onChange={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onInputKeyDown}
        prefix={<SearchIcon />}
        suffix={loadingHints && <LoadingInlineAnimationIcon />}
      />

      <ExploreDropdown
        hints={hints}
        visible={dropdownVisible}
        selectedIndex={selectedIndex}
      />
    </>
  );
}

export default forwardRef(ExploreInput);
