import { useMultisigQuery } from "../../hooks/apollo";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useParams } from "react-router-dom";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Pagination from "../pagination";
import MultisigTable from "../multisig/table";
import { GET_MULTISIGS } from "../../services/gqls";

export default function AccountTabMultisigMultisigs() {
  const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading } = useMultisigQuery(GET_MULTISIGS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      account: id,
    },
  });

  return (
    <StyledPanelTableWrapperNoBordered
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.multisigs?.total}
        />
      }
    >
      <MultisigTable
        data={data?.multisigs?.multisigs}
        loading={loading}
        addressNoLink
      />
    </StyledPanelTableWrapperNoBordered>
  );
}
