import { useProxyAnnouncementsData } from "../../../../hooks/proxy/useProxyAnnouncementsData";
import { useQueryParams } from "../../../../hooks/useQueryParams";
import Pagination from "../../../pagination";
import { StyledPanelTableWrapper } from "../../../styled/panel";
import ProxyAnnouncementsTable from "./table";

export default function ProxyAnnouncementsTab({ delegatee, delegator }) {
  const { page = 1 } = useQueryParams();
  const { data, loading } = useProxyAnnouncementsData(
    {
      delegatee: "19bkaw1EC4BszyaLCpkztXxVzrxKsrpJaArpyJu5hBd1duJ",
      delegator: "16eM1npMwKzpGy48NDna1jC6P71S783wjpbdeKT8RgzQx8Jd",
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
