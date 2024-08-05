import BreadCrumb from "../../components/breadCrumb";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import ProxyTable from "../../components/proxy/table";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { useProxiesData } from "../../hooks/proxy/useProxiesData";
import { useQueryParams } from "../../hooks/useQueryParams";

export default function ProxyPage() {
  const { page = 1 } = useQueryParams();

  const { data, loading } = useProxiesData();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Proxy" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination page={page} pageSize={data?.limit} total={data?.total} />
        }
      >
        <ProxyTable loading={loading} data={data?.items} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
