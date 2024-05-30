import { useRecoveryCallsData } from "../../../../hooks/recovery/useRecoveryCallsData";
import { useRecoveryParams } from "../../../../hooks/recovery/useRecoveryParams";
import { recoveryCallsHead } from "../../../../utils/constants";
import AddressOrIdentity from "../../../address";
import DetailedBlock from "../../../detail/block";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import Table from "../../../table";
import CallCell from "../../../table/callCell";

export default function RecoveryCallsTab() {
  const { page = 1 } = useRecoveryParams();
  const { data, loading } = useRecoveryCallsData();

  const tableData = (data?.items || []).map((call) => {
    return [
      <AddressOrIdentity key={call.lostAccount} address={call.lostAccount} />,
      <DetailedBlock blockHeight={call?.indexer?.blockHeight} />,
      <AddressOrIdentity key={call.rescuer} address={call.rescuer} />,
      <CallCell call={call?.call} />,
    ];
  });

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={data?.limit} total={data?.total} />
      }
    >
      <Table heads={recoveryCallsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
