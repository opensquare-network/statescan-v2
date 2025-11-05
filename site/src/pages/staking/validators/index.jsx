import { StyledPanelTableWrapper } from "../../../components/styled/panel";
import BreadCrumb from "../../../components/breadCrumb";
import Layout from "../../../components/layout";
import {
  useRawValidators,
  useValidatorsWithIdentity,
  useFilteredValidators,
  usePaginatedValidators,
} from "./useValidatorsData";
import StakingValidatorsTable from "./table";
import Pagination from "../../../components/pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useValidatorsFilter } from "../../../hooks/filter/useValidatorsFilter";
import Filter from "../../../components/filter";

export default function StakingValidators() {
  const {
    page = 1,
    search = "",
    onlyActive = "Yes",
    no100Commission = "Yes",
    hasIdentityOnly = "Yes",
  } = useQueryParams();
  const filter = useValidatorsFilter();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data: rawValidators, loading: rawLoading } = useRawValidators();

  const { data: validatorsWithIdentity, loading: identityLoading } =
    useValidatorsWithIdentity(rawValidators);

  const filteredData = useFilteredValidators(validatorsWithIdentity, {
    search,
    onlyActive,
    no100Commission,
    hasIdentityOnly,
  });

  const paginatedData = usePaginatedValidators(filteredData, page, pageSize);

  const loading = rawLoading || identityLoading;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Validators" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={paginatedData.total}
          />
        }
      >
        <StakingValidatorsTable data={paginatedData.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
