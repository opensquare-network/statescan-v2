import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { useQueryParams } from "../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Pagination from "../components/pagination";
import { useMultisigQuery } from "../hooks/apollo";
import { useMultisigsFilter } from "../hooks/filter/useMultisigsFilter";
import Filter from "../components/filter";
import MultisigTable from "../components/multisig/table";
import { GET_MULTISIGS } from "../services/gqls";
import { useState } from "react";

export default function MultisigsPage() {
  const { page = 1, account = "", status } = useQueryParams();
  const filter = useMultisigsFilter();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState(null);

  const { loading } = useMultisigQuery(GET_MULTISIGS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      account,
      multisigState: status ? status.toUpperCase() : null,
    },
    onCompleted: setData,
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Multisigs" }]} />

      <Filter data={filter} filterOnDataChange />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.multisigs?.total}
          />
        }
      >
        <MultisigTable data={data?.multisigs?.multisigs} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
