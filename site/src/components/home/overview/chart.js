import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import LineChart from "../../charts/lineChart";

function OverviewChart() {
  const chainSetting = useSelector(chainSettingSelector);

  return <LineChart token={chainSetting.symbol} />;
}

export default OverviewChart;
