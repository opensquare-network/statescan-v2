import { gql, useQuery } from "@apollo/client";
import { toPrecision } from "@osn/common";
import { parseInt, get, clone } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import ValueDisplay from "../components/displayValue";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { useQueryParams } from "../hooks/useQueryParams";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { Overpass_Mono_14_500 } from "../styles/text";
import { LIST_DEFAULT_PAGE_SIZE, registrarsHead } from "../utils/constants";

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

const GET_REGISTRARS = gql`
  query GetRegistrars {
    registrars {
      fee
      statistics {
        given
        request
        totalFee
      }
      index
      account
    }
  }
`;

export default function RegistrarsPage() {
  const chainSetting = useSelector(chainSettingSelector);
  const { page = 1, descendingBy, ascendingBy } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState(null);

  useEffect(() => {
    const SORT_QUERY_KEY_MAP = {
      registrarIndex: "index",
      receivedReq: "statistics.request",
      totalGiven: "statistics.given",
      pendingReq: "",
      fee: "fee",
      totalEarn: "statistics.totalFee",
    };

    if (descendingBy || ascendingBy) {
      setData((data) => {
        const registrars = clone(data?.registrars);
        if (!registrars) return data;

        const sortedData = (registrars || []).sort((a, b) => {
          if (descendingBy) {
            const key = SORT_QUERY_KEY_MAP[descendingBy];
            return get(b, key) - get(a, key);
          } else {
            const key = SORT_QUERY_KEY_MAP[ascendingBy];
            return get(a, key) - get(b, key);
          }
        });

        return {
          ...data,
          registrars: sortedData,
        };
      });
    }
  }, [descendingBy, ascendingBy]);

  const { loading } = useQuery(GET_REGISTRARS, {
    onCompleted(data) {
      setData(data);
    },
  });

  const tableData = data?.registrars.map((item) => {
    return [
      <Flex gap={24}>
        <Index>#{item.index}</Index>
        <AddressOrIdentity address={item.account} />
      </Flex>,
      item.statistics.request,
      item.statistics.given,
      "", // TODO: registrars pending request
      <ValueDisplay
        value={toPrecision(item.fee, chainSetting.decimals)}
        symbol={chainSetting.symbol}
      />,
      <ValueDisplay
        value={toPrecision(item.statistics.totalFee, chainSetting.decimals)}
        symbol={chainSetting.symbol}
      />,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Registrars" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={data?.registrars?.length}
          />
        }
      >
        <Table heads={registrarsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
