import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import LineChart from "../../charts/lineChart";

function DataPanelChart() {
  const chainSetting = useSelector(chainSettingSelector);

  return <LineChart token={chainSetting.symbol} />;
}

export default DataPanelChart;
