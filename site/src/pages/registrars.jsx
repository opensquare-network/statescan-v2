import { gql, useQuery } from "@apollo/client";
import { toPrecision } from "@osn/common";
import { parseInt } from "lodash";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import ValueDisplay from "../components/displayValue";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { Overpass_Mono_14_500 } from "../styles/text";
import { LIST_DEFAULT_PAGE_SIZE, registrarsHead } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";

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
  const location = useLocation();
  const chainSetting = useSelector(chainSettingSelector);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useQuery(GET_REGISTRARS);

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
