import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as queryString from "query-string";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import Table from "../components/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { FlexEnd } from "../components/styled/flex";
import Switch from "../components/switch";
import { getPageFromQuery } from "../utils/viewFuncs";
import { tokensHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { toTokensTableItem } from "../utils/viewFuncs/toTableItem";
import {
  clearTokenList,
  tokenFetchList,
  tokenListLoadingSelector,
  tokenListSelector,
} from "../store/reducers/tokenSlice";

const INCLUDE_PRECOMPILE = "include_precompile";

function includePrecompileFrom(location) {
  return queryString.parse(location.search)[INCLUDE_PRECOMPILE] === "1";
}

function Tokens() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const includePrecompile = includePrecompileFrom(location);

  const list = useSelector(tokenListSelector);
  const loading = useSelector(tokenListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      tokenFetchList(
        page - 1,
        pageSize,
        { [INCLUDE_PRECOMPILE]: includePrecompile ? "1" : "0" },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize, includePrecompile]);

  useEffect(() => {
    return () => {
      dispatch(clearTokenList());
    };
  }, [dispatch]);

  const setIncludePrecompile = (include) => {
    const query = queryString.parse(location.search);
    const search = queryString.stringify({
      ...query,
      [INCLUDE_PRECOMPILE]: include ? "1" : "0",
      page: 1,
    });
    navigate({ search: `?${search}` });
  };

  return (
    <Layout>
      <BreadCrumb data={[{ name: "ERC20 Tokens" }]} />

      <FlexEnd style={{ marginBottom: 16 }}>
        <Switch
          checked={includePrecompile}
          label="Precompile"
          onChange={setIncludePrecompile}
        />
      </FlexEnd>

      <StyledPanelTableWrapper
        footer={
          <Pagination page={page} pageSize={pageSize} total={list?.total} />
        }
      >
        <Table
          heads={tokensHead}
          data={toTokensTableItem(list?.items)}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Tokens;
