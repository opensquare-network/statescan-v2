import styled from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import { LIDO_WITHDRAWAL_STATUS } from "../../utils/constants";

const STATUS_COLORS = {
  [LIDO_WITHDRAWAL_STATUS.PENDING]: "var(--fillPending)",
  [LIDO_WITHDRAWAL_STATUS.FINALIZED]: "var(--fontSecondary)",
  [LIDO_WITHDRAWAL_STATUS.CLAIMED]: "var(--fillPositive)",
};

const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => STATUS_COLORS[p.status] || p.theme.fontSecondary};
`;

export default function LidoStatus({ status }) {
  if (!status) {
    return "--";
  }

  return <Status status={status}>{status}</Status>;
}
