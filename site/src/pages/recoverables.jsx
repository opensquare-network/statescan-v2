import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoverablesTable from "../components/recovery/recoverables/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoveryQuery } from "../hooks/apollo";
import { useRecoverablesFilter } from "../hooks/filter/useRecoverablesFilter";
import { useRecoverablesParams } from "../hooks/recovery/useRecoverablesParams";
import { GET_RECOVERABLES } from "../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";

export default function RecoverablesPage() {
  const { account, status, page = 1 } = useRecoverablesParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, loading } = useRecoveryQuery(GET_RECOVERABLES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      active: status,
      lostAccount: account,
    },
  });

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
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.recoverables?.total}
          />
        }
      >
        <RecoverablesTable data={data?.recoverables?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
