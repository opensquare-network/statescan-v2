import { useState } from "react";
import BreadCrumb from "../components/breadCrumb";
import Filter from "../components/filter";
import Layout from "../components/layout";
import { useVestingsQuery } from "../hooks/apollo";
import { useVestingsFilter } from "../hooks/filter/useVestingsFilter";
import { useQueryParams } from "../hooks/useQueryParams";
import { GET_VESTINGS } from "../services/gqls";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Pagination from "../components/pagination";
import VestingsTable from "../components/vestings/table";

export function VestingsPage() {
  const { page = 1, address = "" } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filter = useVestingsFilter();
  const [data, setData] = useState(null);

  const { loading } = useVestingsQuery(GET_VESTINGS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address,
    },
    onCompleted: setData,
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Vestings" }]} />

      <Filter data={filter} filterOnDataChange />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.vestings?.total}
          />
        }
      >
        <VestingsTable data={data?.vestings?.vestings} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
