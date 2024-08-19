import { useParams } from "react-router-dom";
import { useProxyCallsData } from "../../../../hooks/proxy/useProxyCallsData";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import ProxyCallsTabTable from "./table";

export default function ProxyCallsTab() {
  const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const { data, loading } = useProxyCallsData(id, page);

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={data?.limit} total={data?.total} />
      }
    >
      <ProxyCallsTabTable data={data?.items} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
