import { proxyCallsHead } from "../../../../utils/constants";
import { hashEllipsis } from "../../../../utils/viewFuncs/text";
import ExtrinsicParametersDisplay from "../../../extrinsicParametersDisplay";
import Table from "../../../table";
import CallCell from "../../../table/callCell";

export default function ProxyCallsTabTable({ loading, data }) {
  const tableData = data?.map?.((rawItem) => {
    const item = { ...rawItem };
    item.call = item.call || item.normalizedCall;

    const isErr = item?.eventData?.[0]?.err;

    return [
      hashEllipsis(item.callHash, 6, 8),
      item?.indexer?.blockTime,
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
