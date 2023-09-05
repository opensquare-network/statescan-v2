import { useQuery } from "@apollo/client";
import { toPrecision } from "@osn/common";
import { parseInt, get, clone } from "lodash";
import { useMemo } from "react";
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
import { GET_REGISTRARS } from "../services/gqls";

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

export default function RegistrarsPage() {
  const chainSetting = useSelector(chainSettingSelector);
  const { page = 1, sort } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(GET_REGISTRARS);

  const sortedData = useMemo(() => {
    // REGISTRAR_INDEX_ASC -> REGISTRAR_INDEX
    const sortKeyPrefix = sort?.replace?.(/_(ASC|DESC)$/, "");
    const descending = sort?.endsWith?.("_DESC");

    const SORT_QUERY_DATA_KEY_MAP = {
      REGISTRAR_INDEX: "index",
      REGISTRAR_RECEIVED_REQ: "statistics.request",
      REGISTRAR_TOTAL_GIVEN: "statistics.given",
      REGISTRAR_PENDING_REQ: "", // TODO: registrars pending request
      REGISTRAR_FEE: "fee",
      REGISTRAR_TOTAL_EARN: "statistics.totalFee",
    };

    const registrars = clone(data?.registrars);
    if (!registrars) return data;

    const sortedData = (registrars || []).sort((a, b) => {
      const key = SORT_QUERY_DATA_KEY_MAP[sortKeyPrefix];
      if (descending) {
        return get(b, key) - get(a, key);
      } else {
        return get(a, key) - get(b, key);
      }
    });

    return {
      ...data,
      registrars: sortedData,
    };
  }, [sort, data]);

  const tableData = sortedData?.registrars.map((item) => {
    return [
      <Flex gap={24}>
        <Index>#{item.index}</Index>
        <AddressOrIdentity address={item.account} linkToTimelineRegistrarPage />
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
