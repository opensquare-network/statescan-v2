import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoverablesTable from "../components/recovery/recoverables/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoverablesFilter } from "../hooks/filter/useRecoverablesFilter";
import { useRecoverablesData } from "../hooks/recovery/useRecoverablesData";
import { useRecoverablesParams } from "../hooks/recovery/useRecoverablesParams";

export default function RecoverablesPage() {
  const { page = 1 } = useRecoverablesParams();
  const { data, loading } = useRecoverablesData();
  const filter = useRecoverablesFilter();

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoverables" }]} />

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
        <RecoverablesTable data={data?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
