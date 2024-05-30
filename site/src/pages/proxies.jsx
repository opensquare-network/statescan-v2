import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoveryProxiesTable from "../components/recovery/proxies/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoveryProxiesData } from "../hooks/recovery/useRecoveryProxiesData";
import { useQueryParams } from "../hooks/useQueryParams";

export default function ProxiesPage() {
  const { page = 1 } = useQueryParams();
  const { data, loading } = useRecoveryProxiesData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Proxies" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination page={page} pageSize={data?.limit} total={data?.total} />
        }
      >
        <RecoveryProxiesTable data={data?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
