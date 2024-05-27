import { useRecoveryQuery } from "../../../../hooks/apollo";
import { GET_RECOVERABLE_CALLS } from "../../../../services/gql/recovery";
import {
  LIST_DEFAULT_PAGE_SIZE,
  recoverableCallsHead,
} from "../../../../utils/constants";
import { useRecoverableParams } from "../../../../utils/hooks/recovery/useRecoverableParams";
import AddressOrIdentity from "../../../address";
import DetailedBlock from "../../../detail/block";
import ExtrinsicParametersDisplay from "../../../extrinsicParametersDisplay";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import Table from "../../../table";
import CallCell from "../../../table/callCell";

export default function RecoverableCallsTab() {
  const { address, height } = useRecoverableParams();
  const { data, loading } = useRecoveryQuery(GET_RECOVERABLE_CALLS, {
    variables: {
      recoverableHeight: height,
      lostAccount: address,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  });

  const tableData = (data?.recoverableCalls?.items || []).map((call) => {
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
