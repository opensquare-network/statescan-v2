import Input from "../../input";
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
import { useIdentityQuery } from "../../../hooks/apollo";
import { GET_IDENTITIES } from "../../../pages/identities";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";

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
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownRef = useRef();

  const hints = useMemo(() => hintsCache[term] ?? [], [term, hintsCache]);
  const [identitys, setIdentitys] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modules } = useChainSettings();
  useIdentityQuery(GET_IDENTITIES, {
    variables: {
      limit: 5,
      offset: 0,
      search: term,
      isNoFetchOnSearchEmpty: true,
    },
    onCompleted(data) {
      term && setIdentitys(data?.identities?.identities || []);
    },
  });

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
      setIdentitys([]);
      setDropdownVisible(false);
      return;
    }
    if (!hintsCache[term]) {
      debouncedFetchHints(term);
    }
  }, [term, debouncedFetchHints, hintsCache]);

  useEffect(() => {
    setDropdownVisible(!!hints?.length || !!identitys?.length);
  }, [hints, identitys]);

  function onInput(e) {
    setTerm(e.target.value);
  }

  function onFocus() {
    if (hints.length || identitys?.length) {
      setDropdownVisible(true);
    }
  }

  function onBlur() {
    setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  }

  function handleExplore() {
    if (!selectedItem) {
      return;
    }

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
        identitys={identitys}
        visible={dropdownVisible}
        setSelectedItem={setSelectedItem}
        onInputKeyDown={onInputKeyDown}
      />
    </>
  );
}

export default forwardRef(ExploreInput);
