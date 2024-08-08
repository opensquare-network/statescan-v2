import { useParams } from "react-router-dom";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import { useProxyCallsData } from "../../../../hooks/proxy/useProxyCallsData";
import ProxyCallsTabTable from "./table";

export default function ProxyCallsTab() {
  const { id, page = 1 } = useParams();
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
