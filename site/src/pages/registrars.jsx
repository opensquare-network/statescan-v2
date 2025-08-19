import { toPrecision } from "@osn/common";
import { get, clone, isNil } from "lodash";
import { useMemo, memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddressOrIdentity from "../components/address";
import BreadCrumb from "../components/breadCrumb";
import ValueDisplay from "../components/displayValue";
import Layout from "../components/layout";
import { Flex } from "../components/styled/flex";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { useQueryParams } from "../hooks/useQueryParams";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { Overpass_Mono_14_500 } from "../styles/text";
import { registrarsHead } from "../utils/constants";
import { GET_REGISTRARS } from "../services/gqls";
import { useIdentityQuery } from "../hooks/apollo";
import { timeDuration, time } from "../utils/viewFuncs/time";
import Tooltip from "../components/tooltip";
import Link from "../components/styled/link";

const Index = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

function LastJudgementLink({ indexer, children }) {
  const { blockHeight, extrinsicIndex, chain } = indexer;
  const link = useMemo(() => {
    if (isNil(blockHeight) && isNil(extrinsicIndex)) {
      return null;
    }

    let domain = null;
    if (isNil(chain)) {
      domain = `https://${process.env.REACT_APP_PUBLIC_CHAIN}.statescan.io/#`;
    } else {
      domain = `https://${chain}-${process.env.REACT_APP_PUBLIC_CHAIN}.statescan.io/#`;
    }

    if (isNil(extrinsicIndex)) {
      return `${domain}/blocks/${blockHeight}`;
    }

    return `${domain}/extrinsics/${blockHeight}-${extrinsicIndex}`;
  }, [blockHeight, extrinsicIndex, chain]);

  if (isNil(link)) {
    return children;
  }

  return (
    <Link to={link} target="_blank">
      {children}
    </Link>
  );
}

const LastJudgementWrapper = memo(LastJudgementLink);

export default function RegistrarsPage() {
  const chainSetting = useSelector(chainSettingSelector);
  const { sort } = useQueryParams();

  const { data, loading } = useIdentityQuery(GET_REGISTRARS);

  const sortedData = useMemo(() => {
    // REGISTRAR_INDEX_ASC -> REGISTRAR_INDEX
    const sortKeyPrefix = sort?.replace?.(/_(ASC|DESC)$/, "");
    const descending = sort?.endsWith?.("_DESC");

    const SORT_QUERY_DATA_KEY_MAP = {
      REGISTRAR_INDEX: "index",
      REGISTRAR_RECEIVED_REQ: "statistics.request",
      REGISTRAR_TOTAL_GIVEN: "statistics.given",
      REGISTRAR_FEE: "fee",
      REGISTRAR_TOTAL_EARN: "statistics.totalFee",
    };

    const registrars = clone(data?.identityRegistrars);
    if (!registrars) return data;

    const sortedRegistrars = (registrars || []).sort((a, b) => {
      const key = SORT_QUERY_DATA_KEY_MAP[sortKeyPrefix];
      if (descending) {
        return get(b, key) - get(a, key);
      } else {
        return get(a, key) - get(b, key);
      }
    });

    return {
      ...data,
      identityRegistrars: sortedRegistrars,
    };
  }, [sort, data]);

  const tableData = sortedData?.identityRegistrars.map((item) => {
    const lastJudgement = item?.statistics?.lastGivenIndexer?.blockTime;
    return [
      <Flex gap={24}>
        <Index>#{item.index}</Index>
        <AddressOrIdentity
          key={item.account}
          address={item.account}
          linkToIdentityRegistrarTimeline
        />
      </Flex>,
      item.statistics.request,
      item.statistics.given,
      <span>
        {lastJudgement ? (
          <Tooltip tip={time(lastJudgement)}>
            <LastJudgementWrapper indexer={item.statistics.lastGivenIndexer}>
              {timeDuration(lastJudgement)}
            </LastJudgementWrapper>
          </Tooltip>
        ) : (
          "-"
        )}
      </span>,
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

      <StyledPanelTableWrapper>
        <Table heads={registrarsHead} data={tableData} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
