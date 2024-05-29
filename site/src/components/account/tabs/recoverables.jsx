import { useParams } from "react-router-dom";
import RecoverablesTable from "../../recovery/recoverables/table";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { useRecoverablesData } from "../../../hooks/recovery/useRecoverablesData";
import Pagination from "../../pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";

export default function AccountDetailRecoverablesTab() {
  const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const { data, loading } = useRecoverablesData({ lostAccount: id });

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={data?.limit} total={data?.total} />
      }
    >
      <RecoverablesTable data={data?.items} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
