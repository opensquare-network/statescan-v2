import { useRecoverableRecoveriesData } from "../../../../hooks/recovery/useRecoverableRecoveriesData";
import { useRecoverableParams } from "../../../../hooks/recovery/useRecoverableParams";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import RecoveriesTable from "../../recoveries/table";

export default function RecoverableRecoveriesTab() {
  const { page = 1 } = useRecoverableParams();
  const { data, loading } = useRecoverableRecoveriesData();

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={data?.limit} total={data?.total} />
      }
    >
      <RecoveriesTable loading={loading} data={data?.items} />
    </StyledPanelTableWrapper>
  );
}
