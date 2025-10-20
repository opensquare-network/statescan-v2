import { useState, memo } from "react";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useParams } from "react-router-dom";
import { StyledPanelTableWrapperNoBordered } from "../../styled/panel";
import Pagination from "../../pagination";
import AccountStakingRewardsTable from "./table";
import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_REWARDS } from "../../../services/gqls";

function AccountTabStakingRewards() {
  const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const [data, setData] = useState(null);

  const { loading } = useStakingQuery(GET_STAKING_REWARDS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address: id,
    },
    onCompleted: setData,
  });

  return (
    <StyledPanelTableWrapperNoBordered
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          total={data?.stakingRewards?.total}
        />
      }
    >
      <AccountStakingRewardsTable
        data={data?.stakingRewards?.items}
        loading={loading}
      />
    </StyledPanelTableWrapperNoBordered>
  );
}

export default memo(AccountTabStakingRewards);
