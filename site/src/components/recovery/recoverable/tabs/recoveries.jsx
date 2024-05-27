import { useRecoverableRecoveriesData } from "../../../../hooks/recovery/useRecoverableRecoveriesData";
import { Panel } from "../../../styled/panel";
import RecoveriesTable from "../../recoveries/table";

export default function RecoverableRecoveriesTab() {
  const { data, loading } = useRecoverableRecoveriesData();

  return (
    <Panel>
      <RecoveriesTable loading={loading} data={data?.items} />
    </Panel>
  );
}
