import styled from "styled-components";
import { proxyCallsHead } from "../../../../utils/constants";
import { hashEllipsis } from "../../../../utils/viewFuncs/text";
import { time } from "../../../../utils/viewFuncs/time";
import DetailedBlock from "../../../detail/block";
import ExtrinsicParametersDisplay from "../../../extrinsicParametersDisplay";
import { TextTertiary } from "../../../styled/text";
import Table from "../../../table";
import CallCell from "../../../table/callCell";
import { Overpass_Mono_14_500 } from "../../../../styles/text";

const Hash = styled.div`
  ${Overpass_Mono_14_500}
`;

export default function ProxyCallsTabTable({ loading, data }) {
  const tableData = data?.map?.((rawItem) => {
    const item = { ...rawItem };
    item.call = item.call || item.normalizedCall;

    const isErr = item?.eventData?.[0]?.err;

    return [
      <Hash>{hashEllipsis(item.callHash, 6, 8)}</Hash>,
      [
        <DetailedBlock blockHeight={item?.indexer?.blockHeight} />,
        <TextTertiary>{time(item?.indexer?.blockTime)}</TextTertiary>,
      ],
      <img
        alt=""
        src={isErr ? "/imgs/icons/cross.svg" : "/imgs/icons/check.svg"}
      />,
      <CallCell call={item.normalizedCall} />,
      <ExtrinsicParametersDisplay extrinsic={item} />,
    ];
  });

  return <Table heads={proxyCallsHead} data={tableData} loading={loading} />;
}
