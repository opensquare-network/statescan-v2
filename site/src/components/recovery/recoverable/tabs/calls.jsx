import { useRecoverableCallsData } from "../../../../hooks/recovery/useRecoverableCallsData";
import { recoverableCallsHead } from "../../../../utils/constants";
import AddressOrIdentity from "../../../address";
import DetailedBlock from "../../../detail/block";
import ExtrinsicParametersDisplay from "../../../extrinsicParametersDisplay";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import Table from "../../../table";
import CallCell from "../../../table/callCell";

export default function RecoverableCallsTab() {
  const { data, loading } = useRecoverableCallsData();

  const tableData = (data?.items || []).map((call) => {
    return [
      <DetailedBlock blockHeight={call?.indexer?.blockHeight} />,
      <AddressOrIdentity key={call.rescuer} address={call.rescuer} />,
      call?.indexer?.blockTime,
      <CallCell call={call?.call} />,
      <ExtrinsicParametersDisplay extrinsic={call} />,
    ];
  });

  return (
    <StyledPanelTableWrapper>
      <Table heads={recoverableCallsHead} data={tableData} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
