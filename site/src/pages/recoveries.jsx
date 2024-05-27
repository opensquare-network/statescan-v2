import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import RecoveriesTable from "../components/recovery/recoveries/table";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import { useRecoveryQuery } from "../hooks/apollo";
import { useQueryParams } from "../hooks/useQueryParams";
import { GET_RECOVERIES } from "../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";

export default function RecoveriesPage() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, loading } = useRecoveryQuery(GET_RECOVERIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Recoveries" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.recoveries?.total}
          />
        }
      >
        <RecoveriesTable data={data?.recoveries?.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
