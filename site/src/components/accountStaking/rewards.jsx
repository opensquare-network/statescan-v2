import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../../hooks/useQueryParams";
// import { useParams } from "react-router-dom";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Pagination from "../pagination";

export default function AccountTabStakingRewards() {
  // const { id } = useParams();
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  return (
    <StyledPanelTableWrapperNoBordered
      footer={
        <Pagination
          page={page}
          pageSize={pageSize}
          // total={}
        />
      }
    >
      StakingRewards table
    </StyledPanelTableWrapperNoBordered>
  );
}
