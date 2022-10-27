import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { accountsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../components/displayValue";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import AddressOrIdentity from "../components/address";
import styled from "styled-components";
import {
  accountFetchList,
  accountListLoadingSelector,
  accountListSelector,
  cleanAccountList,
} from "../store/reducers/accountSlice";

const AlignLeft = styled.div`
  * {
    text-align: left;
  }
`;

function Accounts() {
  const location = useLocation();
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(accountListSelector);
  const loading = useSelector(accountListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      accountFetchList(getPageFromQuery(location) - 1, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch, location, pageSize]);

  useEffect(() => {
    dispatch(cleanAccountList());
  }, [dispatch]);

  const data =
    list?.items?.map((account, index) => {
      return [
        `#${(parseInt(page) - 1) * pageSize + index + 1}`,
        <AlignLeft>
          <AddressOrIdentity address={account?.address} ellipsis={false} />
        </AlignLeft>,
        <ValueDisplay
          value={toPrecision(account?.data?.total, chainSetting?.decimals)}
          symbol={chainSetting?.symbol}
        />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Accounts" }]} />
      <StyledPanelTableWrapper>
        <Table heads={accountsHead} data={data} loading={loading} />
        <Pagination
          page={parseInt(page)}
          pageSize={pageSize}
          total={list?.total}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Accounts;
