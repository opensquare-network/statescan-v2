import { useState } from "react";
import { StyledPanelTableWrapper } from "../../../components/styled/panel";
import BreadCrumb from "../../../components/breadCrumb";
import Layout from "../../../components/layout";
import { useValidatorsData } from "./useValidatorsData";
import StakingValidatorsTable from "./table";
import Pagination from "../../../components/pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";

export default function StakingValidators() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState(null);

  const { loading } = useValidatorsData({
    onCompleted: setData,
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Validators" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.stakingValidators?.total}
          />
        }
      >
        <StakingValidatorsTable
          data={data?.stakingValidators?.items}
          loading={loading}
        />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
