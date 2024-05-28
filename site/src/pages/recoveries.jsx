import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoveriesTable from "../components/recovery/recoveries/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoverablesFilter } from "../hooks/filter/useRecoverablesFilter";
import { useRecoverablesParams } from "../hooks/recovery/useRecoverablesParams";
import { useRecoveriesData } from "../hooks/recovery/useRecoveriesData";

export default function RecoveriesPage() {
  const { page = 1 } = useRecoverablesParams();
  const { data, loading } = useRecoveriesData();
  const filter = useRecoverablesFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoveries" }]} />

      <Filter
        data={filter}
        filterOnDataChange
        showFilterButton={false}
        showResetButton={false}
      />

      <StyledPanelTableWrapper
        footer={
          <Pagination page={page} pageSize={data?.limit} total={data?.total} />
        }
      >
        <RecoveriesTable data={data?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
