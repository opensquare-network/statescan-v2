import styled from "styled-components";
import { useRecoveryQuery } from "../../../hooks/apollo";
import { GET_RECOVERY_STATISTICS } from "../../../services/gql/recovery";
import { Inter_12_500 } from "../../../styles/text";
import DataRecoverableIcon from "../../icons/dataRecoverable";
import DataRecoveryIcon from "../../icons/dataRecovery";
import DataRecoveryProxyIcon from "../../icons/dataRecoveryProxy";
import Loading from "../../loadings/loading";
import { Flex } from "../../styled/flex";
import LinkOrigin from "../../styled/link";
import Tooltip from "../../tooltip";
import OverviewItem from "../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../overview/styled";

const Link = styled(LinkOrigin)`
  &:hover {
    text-decoration: underline;
    color: var(--textPrimary);
  }
`;

const StatusLink = styled(Link)`
  ${Inter_12_500};
  color: var(--fontSecondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

function useData() {
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERY_STATISTICS);
  return {
    data: data?.recoveryStatistics,
    ...rest,
  };
}

export default function RecoverySection() {
  const { data, loading } = useData();

  if (loading) {
    return <Loading />;
  }

  const activeRecoverables = data?.recoverable?.active || 0;
  const inactiveRecoverables = data?.recoverable?.inactive || 0;
  const totalRecoverables = activeRecoverables + inactiveRecoverables;

  const closedRecoveries = data?.recovery?.closed || 0;
  const unClosedRecoveries = data?.recovery?.unClosed || 0;
  const totalRecoveries = closedRecoveries + unClosedRecoveries;

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<DataRecoverableIcon />}
          label="Recoverable"
          value={
            <div>
              <Link to={`/recoverables`}>{totalRecoverables}</Link>
              <Flex gap={12} style={{ marginTop: 8 }}>
                <Tooltip tip="Active">
                  <StatusLink to={`/recoverables?status=active`}>
                    <img src="/imgs/icons/status-active.svg" />
                    {activeRecoverables}
                  </StatusLink>
                </Tooltip>
                <Tooltip tip="Inactive">
                  <StatusLink to={`/recoverables?status=inactive`}>
                    <img src="/imgs/icons/status-inactive.svg" />
                    {inactiveRecoverables}
                  </StatusLink>
                </Tooltip>
              </Flex>
            </div>
          }
        />

        <OverviewItem
          icon={<DataRecoveryIcon />}
          label="Recovery"
          value={
            <div>
              <Link to={`/recoveries`}>{totalRecoveries}</Link>
              <Flex gap={12} style={{ marginTop: 8 }}>
                <Tooltip tip="Unclosed">
                  <StatusLink to={`/recoveries?status=unclosed`}>
                    <img src="/imgs/icons/status-unclosed.svg" />
                    {unClosedRecoveries}
                  </StatusLink>
                </Tooltip>
                <Tooltip tip="Closed">
                  <StatusLink to={`/recoveries?status=closed`}>
                    <img src="/imgs/icons/status-closed.svg" />
                    {closedRecoveries}
                  </StatusLink>
                </Tooltip>
              </Flex>
            </div>
          }
        />

        <OverviewItem
          icon={<DataRecoveryProxyIcon />}
          label="Proxy"
          value={
            <div>
              <Link to={`/proxies`}>{data?.proxies || 0}</Link>
            </div>
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
