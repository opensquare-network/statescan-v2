import { useMemo } from "react";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  toTxEvmBlockDetailItem,
  toTxEvmTxDetailItem,
} from "../../utils/viewFuncs/toDetailItem";
import { Panel } from "../styled/panel";
import List from "../list";
import Divider from "../styled/divider";

export default function TxEvmDetailPanel({ data }) {
  const chainSetting = useChainSettings();

  const blockListData = useMemo(() => {
    return toTxEvmBlockDetailItem(data);
  }, [data]);

  const txListData = useMemo(() => {
    return toTxEvmTxDetailItem(data, chainSetting);
  }, [data, chainSetting]);

  return (
    <Panel>
      <List data={blockListData} />

      <Divider />

      <List data={txListData} />
    </Panel>
  );
}
