import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoverablesTable from "../components/recovery/recoverables/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoveryQuery } from "../hooks/apollo";
import { useQueryParams } from "../hooks/useQueryParams";
import { GET_RECOVERABLES } from "../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";

export default function RecoverablesPage() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, loading } = useRecoveryQuery(GET_RECOVERABLES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoverables" }]} />

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
