import Input from "../../input";
import { first, castArray } from "lodash";
import debounce from "lodash.debounce";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
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
import { useIdentityLazyQuery } from "../../../hooks/apollo";
import { GET_IDENTITIES } from "../../../pages/identities";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { useShallowCompareEffect } from "react-use";

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
  const [loadingHints, setLoadingHints] = useState(false);
  const [selectedHintItem, setSelectedHintItem] = useState(null);

  const dropdownRef = useRef();

  const hints = useMemo(() => hintsCache[term] ?? [], [term, hintsCache]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modules } = useChainSettings();
  const [fetchIdentities] = useIdentityLazyQuery(GET_IDENTITIES, {
    variables: {
      limit: 5,
      offset: 0,
      search: term,
      isNoFetchOnSearchEmpty: true,
    },
  });

  const [selectedHintKey, setSelectedHintKey] = useState();
  const hintsKeyValueMap = useMemo(() => {
    const result = {};

    hints.forEach((hint) => {
      const itemArray = castArray(hint.value);
      itemArray.forEach((_, idx) => {
        result[`${hint.type}-${idx}`] = hint;
      });
    });

    return result;
  }, [hints]);
  const hintsKeys = Object.keys(hintsKeyValueMap);
  useShallowCompareEffect(() => {
    setSelectedHintKey(first(hintsKeys));
  }, [hintsKeys]);

  async function fetchHints(term) {
    setLoadingHints(true);

    return Promise.all([
      api.fetch(homeSearchHints, { term }),
      fetchIdentities(),
    ])
      .then(([hintsResp, identitiesResp]) => {
        const hintsResult = hintsResp?.result;
        const identitiesResult = identitiesResp?.data?.identities?.identities;

        let hintsData = [];

        if (hintsResult) {
          hintsData = [
            ...hintsData,
            ...compatExploreDropdownHints(hintsResult),
          ];
        }

        if (identitiesResult) {
          hintsData = [
            ...hintsData,
            { type: "identities", value: identitiesResult },
          ];
        }

        if (hintsData.length) {
          hintsCache[term] = hintsData;
          setHintsCache({
            ...hintsCache,
            [term]: hintsData,
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
    if (!selectedHintItem) {
      return;
    }

    const { type, value } = selectedHintItem;
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
    } else if (code === "ArrowUp" || code === "ArrowDown") {
      event.preventDefault();
      dropdownRef.current.handleArrowNavigate(code);
    }
  }
  const placeholder = useMemo(() => {
    let msg = "Block / Address";
    if (!process.env.REACT_APP_PUBLIC_SIMPLE_MODE) {
      msg += " / Extrinsic";
    }
    if (modules?.identity) {
      msg += " / Identity";
    }
    if (modules?.assets) {
      msg += " / Asset";
    }
    if (modules?.uniques) {
      msg += " / NFT";
    }
    msg += " /...";
    return msg;
  }, [modules]);

  return (
    <>
      <Input
        placeholder={placeholder}
        {...props}
        onChange={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onInputKeyDown}
        prefix={<SearchIcon />}
        suffix={loadingHints && <LoadingInlineAnimationIcon />}
      />

      <ExploreDropdown
        ref={dropdownRef}
        hints={hints}
        visible={dropdownVisible}
        onInputKeyDown={onInputKeyDown}
        hintsKeyValueMap={hintsKeyValueMap}
        hintsKeys={hintsKeys}
        selectedHintKey={selectedHintKey}
        setSelectedHintKey={setSelectedHintKey}
        setSelectedHintItem={setSelectedHintItem}
      />
    </>
  );
}

export default forwardRef(ExploreInput);
