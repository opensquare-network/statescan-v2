import BreadCrumb from "../../components/breadCrumb";
import ValueDisplay from "../../components/displayValue";
import Filter from "../../components/filter";
import SearchIcon from "../../components/icons/searchIcon";
import Layout from "../../components/layout";
import EvmAddress from "../../components/lido/evmAddress";
import Pagination from "../../components/pagination";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import Table from "../../components/table";
import HelpLabel from "../../components/tooltip/helpLabel";
import styled from "styled-components";
import {
  useLidoStETHHoldersData,
  useLidoWstETHHoldersData,
} from "../../hooks/lido/useLidoHoldersData";
import { useLidoStEthSharesRateData } from "../../hooks/lido/useLidoStEthSharesRateData";
import { useQueryParams } from "../../hooks/useQueryParams";
import {
  toLidoEtherAmount,
  toStEthAmountFromShares,
} from "../../utils/viewFuncs/lido";
import { useEffect, useState } from "react";

const HoldersTableWrapper = styled(StyledPanelTableWrapper)`
  table {
    table-layout: fixed;
  }
`;

const wstEthHoldersHead = [
  { name: "Address", width: 200 },
  {
    name: "Balance",
    type: "sortable",
    sortDefaultQueryValue: "balance_desc",
    sortAscendingQueryValue: "balance_asc",
    sortDescendingQueryValue: "balance_desc",
    align: "right",
    width: 180,
  },
];

const stEthHoldersHead = [
  { name: "Address", width: 200 },
  {
    name: (
      <HelpLabel tip="stETH holder shares." align="right">
        Shares
      </HelpLabel>
    ),
    type: "sortable",
    sortDefaultQueryValue: "shares_desc",
    sortAscendingQueryValue: "shares_asc",
    sortDescendingQueryValue: "shares_desc",
    align: "right",
    width: 180,
  },
  {
    name: "Balance",
    align: "right",
    width: 180,
  },
];

function toWstEthHoldersTableData(items = []) {
  return items.map((item) => {
    return [
      <EvmAddress
        key={`${item.address}-address`}
        address={item.address}
        copy={false}
        maxWidth="152px"
      />,
      <ValueDisplay
        key={`${item.address}-balance`}
        value={toLidoEtherAmount(item.balance)}
        symbol="wstETH"
        showNotEqualTooltip
      />,
    ];
  });
}

function toStEthHoldersTableData(items = [], sharesRate) {
  return items.map((item) => [
    <EvmAddress
      key={`${item.address}-address`}
      address={item.address}
      copy={false}
      maxWidth="152px"
    />,
    <ValueDisplay
      key={`${item.address}-shares`}
      value={toLidoEtherAmount(item.shares)}
      symbol="shares"
      showNotEqualTooltip
    />,
    <ValueDisplay
      key={`${item.address}-balance`}
      value={toStEthAmountFromShares(item.shares, sharesRate)}
      symbol="stETH"
      showNotEqualTooltip
    />,
  ]);
}

function useLidoHoldersFilter() {
  const [filter, setFilter] = useState([]);
  const { address = "" } = useQueryParams({ parseNumbers: false });

  useEffect(() => {
    setFilter([
      {
        value: address,
        type: "input",
        name: "Address",
        query: "address",
        inputProps: {
          placeholder: "Address",
          prefix: <SearchIcon style={{ width: 16, height: 16 }} />,
        },
      },
    ]);
  }, [address]);

  return filter;
}

export function LidoStETHHoldersTable() {
  const { page = 1 } = useQueryParams();
  const { data: sharesRate, loading } = useLidoStEthSharesRateData();
  const { data, loading: listLoading } = useLidoStETHHoldersData();
  const tableData = toStEthHoldersTableData(data?.items, sharesRate);

  return (
    <HoldersTableWrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={data?.limit}
          total={data?.total}
        />
      }
    >
      <Table
        heads={stEthHoldersHead}
        data={tableData}
        loading={listLoading || loading}
      />
    </HoldersTableWrapper>
  );
}

export function LidoStETHHolders() {
  const filter = useLidoHoldersFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "stETH Holders" }]} />

      <Filter data={filter} />

      <LidoStETHHoldersTable />
    </Layout>
  );
}

export function LidoWstETHHoldersTable() {
  const { page = 1 } = useQueryParams();
  const { data, loading } = useLidoWstETHHoldersData();
  const tableData = toWstEthHoldersTableData(data?.items);

  return (
    <HoldersTableWrapper
      footer={
        <Pagination
          page={parseInt(page)}
          pageSize={data?.limit}
          total={data?.total}
        />
      }
    >
      <Table heads={wstEthHoldersHead} data={tableData} loading={loading} />
    </HoldersTableWrapper>
  );
}

export default function LidoWstETHHolders() {
  const filter = useLidoHoldersFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "wstETH Holders" }]} />

      <Filter data={filter} />

      <LidoWstETHHoldersTable />
    </Layout>
  );
}
