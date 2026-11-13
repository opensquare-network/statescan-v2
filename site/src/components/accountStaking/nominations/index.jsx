import { useState, memo } from "react";
import { useAccountAddress } from "../../account/context/accountAddressContext";
import { StyledPanelTableWrapperNoBordered } from "../../styled/panel";
import AccountStakingNominationsTable from "./table";
import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_NOMINATIONS } from "../../../services/gqls";

function AccountTabStakingNominations() {
  const address = useAccountAddress();
  const [data, setData] = useState(null);

  const { loading } = useStakingQuery(GET_STAKING_NOMINATIONS, {
    variables: {
      address,
    },
    onCompleted: setData,
  });

  return (
    <StyledPanelTableWrapperNoBordered>
      <AccountStakingNominationsTable
        data={data?.stakingNominations?.validators}
        loading={loading}
      />
    </StyledPanelTableWrapperNoBordered>
  );
}

export default memo(AccountTabStakingNominations);
