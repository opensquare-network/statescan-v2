import { DetailTableView } from "./table";
import { toForeignAssetsTabItem } from "../../utils/viewFuncs/toTableItem";
import { accountForeignAssetsHead } from "../../utils/constants";
import { useAccountForeignAssets } from "../account/context/foreignAssetsContext";

export default function ForeignAssetsTable() {
  const { foreignAssetsData, loading } = useAccountForeignAssets();

  return (
    <DetailTableView
      heads={accountForeignAssetsHead}
      table={foreignAssetsData}
      loading={loading}
      transformData={toForeignAssetsTabItem}
    />
  );
}
