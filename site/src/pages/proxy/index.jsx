import BreadCrumb from "../../components/breadCrumb";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import ProxyTable from "../../components/proxy/table";
import { StyledPanelTableWrapper } from "../../components/styled/panel";
import { useProxiesFilter } from "../../hooks/filter/useProxiesFilter";
import { useProxiesData } from "../../hooks/proxy/useProxiesData";
import { useProxiesParams } from "../../hooks/proxy/useProxiesParams";
import { PROXY_STATUS } from "../../utils/constants";

export default function ProxyPage() {
  const { page = 1, status, delegationType } = useProxiesParams();

  const filter = useProxiesFilter();

  const isActive =
    status === PROXY_STATUS.ACTIVE
      ? true
      : status === PROXY_STATUS.REMOVED
      ? false
      : null;

  const isPure = delegationType === "pure";

  const { data, loading } = useProxiesData({ isActive, isPure }, page);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Proxy" }]} />

      <Filter data={filter} filterOnDataChange showFilterButton={false} />

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
