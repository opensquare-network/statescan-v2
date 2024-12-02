import { useMemo } from "react";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  toTxEvmBlockDetailItem,
  toTxEvmTxDetailItem,
} from "../../utils/viewFuncs/toDetailItem";
import { Panel } from "../styled/panel";
import List from "../list";
import Divider from "../styled/divider";
import { useSelector } from "react-redux";
import { finalizedHeightSelector } from "../../store/reducers/chainSlice";

export default function TxEvmDetailContent({ data }) {
  const chainSetting = useChainSettings();
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockNumber } = data || {};
  const isFinalized = blockNumber <= finalizedHeight;

  const extrinsic = useMemo(() => {
    return {
      ...data,
      isFinalized,
    };
  }, [data, isFinalized]);

  const blockListData = useMemo(() => {
    return toTxEvmBlockDetailItem(extrinsic);
  }, [extrinsic]);

  const txListData = useMemo(() => {
    return toTxEvmTxDetailItem(extrinsic, chainSetting);
  }, [extrinsic, chainSetting]);

  return (
    <>
      <Panel>
        <List data={blockListData} />

        <Divider />

        <List data={txListData} />
      </Panel>
    </>
  );
}
