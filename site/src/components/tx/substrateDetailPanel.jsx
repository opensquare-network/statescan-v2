import { useMemo } from "react";
import { toExtrinsicDetailItem } from "../../utils/viewFuncs/toDetailItem";
import { Panel } from "../styled/panel";
import List from "../list";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";

export default function TxSubstrateDetailPanel({ data = {} }) {
  const listData = useMemo(() => {
    data.call = {
      section: data?.section,
      method: data?.method,
    };

    return toExtrinsicDetailItem(data);
  }, [data]);

  return (
    <Panel>
      <List data={listData} />

      <ExtrinsicParametersDisplay extrinsic={data} title="Parameters" />
    </Panel>
  );
}
