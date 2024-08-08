import { useProxyAnnouncementsData } from "../../../../hooks/proxy/useProxyAnnouncementsData";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import ProxyAnnouncementsTable from "./table";

export default function ProxyAnnouncementsTab({ delegatee, delegator }) {
  const { page = 1 } = useQueryParams();
  const { data, loading } = useProxyAnnouncementsData(
    {
      delegatee,
      delegator,
    },
    page,
  );

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={data?.limit} total={data?.total} />
      }
    >
      <ProxyAnnouncementsTable data={data?.items} loading={loading} />
    </StyledPanelTableWrapper>
  );
}
