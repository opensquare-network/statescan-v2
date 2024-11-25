import { useMemo } from "react";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import List from "../components/list";
import { Panel } from "../components/styled/panel";
import { useTxData } from "../hooks/tx/useTxData";
import {
  toTxEvmBlockDetailItem,
  toTxEvmTxDetailItem,
} from "../utils/viewFuncs/toDetailItem";
import Divider from "../components/styled/divider";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

// TODO: isEvm
export default function TXPage() {
  const breadCrumb = <BreadCrumb data={[{ name: "Transaction" }]} />;
  const { data } = useTxData();
  const chainSetting = useChainSettings();

  const blockListData = useMemo(() => {
    return toTxEvmBlockDetailItem(data);
  }, [data]);

  const txListData = useMemo(() => {
    return toTxEvmTxDetailItem(data, chainSetting);
  }, [data, chainSetting]);

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={blockListData} />

        <Divider />

        <List data={txListData} />
      </Panel>
    </DetailLayout>
  );
}
