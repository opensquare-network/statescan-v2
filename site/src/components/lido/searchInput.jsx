import { first } from "lodash";
import debounce from "lodash.debounce";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useShallowCompareEffect } from "react-use";
import { fetchLidoSearchHints } from "../../services/lidoSearch";
import { closeMobileMenu } from "../../store/reducers/mobileMenuSlice";
import Input from "../input";
import LoadingInlineAnimationIcon from "../icons/loadingInlineAnimationIcon";
import SearchIcon from "../icons/searchIcon";
import LidoSearchDropdown, { makeLidoSearchRouteLink } from "./searchDropdown";

function LidoSearchInput(props, ref) {
  useImperativeHandle(ref, () => ({ handleExplore }));

  const [term, setTerm] = useState("");
  const [hintsCache, setHintsCache] = useState({});
  const [focused, setFocused] = useState(false);
  const [loadingHints, setLoadingHints] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hints = useMemo(() => hintsCache[term] ?? [], [term, hintsCache]);
  const [selectedHintKey, setSelectedHintKey] = useState();

  const hintItems = useMemo(
    () =>
      hints.flatMap((hint) =>
        hint.value.map((value, idx) => ({
          key: `${hint.type}-${idx}`,
          type: hint.type,
          value,
        })),
      ),
    [hints],
  );
  const selectedHintItem = hintItems.find(
    (item) => item.key === selectedHintKey,
  );
  const hintsKeys = useMemo(
    () => hintItems.map((item) => item.key),
    [hintItems],
  );
  const dropdownVisible = focused && !!hints.length;

  useShallowCompareEffect(() => {
    setSelectedHintKey(first(hintsKeys));
  }, [hintsKeys]);

  const fetchHints = useCallback(async (searchTerm) => {
    setLoadingHints(true);

    try {
      const hintsData = await fetchLidoSearchHints(searchTerm);

      setHintsCache((prev) => ({
        ...prev,
        [searchTerm]: hintsData,
      }));
    } finally {
      setLoadingHints(false);
    }
  }, []);

  const debouncedFetchHints = useMemo(
    () => debounce(fetchHints, 300),
    [fetchHints],
  );

  useEffect(() => {
    return () => {
      debouncedFetchHints.cancel();
    };
  }, [debouncedFetchHints]);

  useEffect(() => {
    if (!term) {
      return;
    }

    if (!hintsCache[term]) {
      debouncedFetchHints(term);
    }
  }, [term, debouncedFetchHints, hintsCache]);

  function handleExplore() {
    if (!selectedHintItem) {
      return;
    }

    const { type, value } = selectedHintItem;
    navigate(makeLidoSearchRouteLink(type, value));
    dispatch(closeMobileMenu());
  }

  function handleInput(event) {
    setTerm(event.target.value);
  }

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setTimeout(() => {
      setFocused(false);
    }, 200);
  }

  function handleInputKeyDown(event) {
    if (!dropdownVisible) {
      return;
    }

    const { code } = event;

    if (code === "Enter") {
      handleExplore();
    } else if (code === "ArrowUp" || code === "ArrowDown") {
      event.preventDefault();
      dropdownRef.current.handleArrowNavigate(code);
    }
  }

  return (
    <>
      <Input
        placeholder="Node operator / Staking module / Holder /..."
        {...props}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        prefix={<SearchIcon />}
        suffix={loadingHints && <LoadingInlineAnimationIcon />}
      />

      <LidoSearchDropdown
        ref={dropdownRef}
        hints={hints}
        visible={dropdownVisible}
        hintsKeys={hintsKeys}
        selectedHintKey={selectedHintKey}
        setSelectedHintKey={setSelectedHintKey}
      />
    </>
  );
}

export default forwardRef(LidoSearchInput);
