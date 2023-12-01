import styled from "styled-components";
import { MULTISIG_STATUS, multisigsHead } from "../../utils/constants";
import AddressOrIdentity from "../address";
import { Flex } from "../styled/flex";
import Table from "../table";
import MultisigLink from "./link";
import { Inter_14_500 } from "../../styles/text";
import Dot from "../dot";
import Tooltip from "../tooltip";
import { TextSecondary, TextTertiary } from "../styled/text";
import { ColoredMonoLink } from "../styled/link";
import { hashEllipsis } from "../../utils/viewFuncs/text";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";
import { time } from "../../utils/viewFuncs/time";

const ApprovingText = styled.div`
  ${Inter_14_500};
  color: var(--fontPrimary);
`;
const ApprovingSlashText = styled.span`
  color: var(--fontTertiary);
  margin: 0 2px;
`;
const ApprovingCountText = styled.span`
  color: var(--fontSecondary);
`;

const ApprovingCell = styled.div`
  display: flex;
  align-items: center;
`;

const SignatoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  * {
    color: var(--textPrimary);
    white-space: nowrap;
  }
`;

const STATUS_COLORS = {
  [MULTISIG_STATUS.APPROVING]: "var(--theme500)",
  [MULTISIG_STATUS.EXECUTED]: "var(--fontPositive)",
  [MULTISIG_STATUS.CANCELLED]: "var(--fillNegative)",
};
const Status = styled.div`
  ${Inter_14_500};
  color: ${(p) => p.color};
`;

export default function MultisigTable({
  data = [],
  loading,
  addressNoLink = false,
}) {
  const tableData = data?.map?.((multisig) => {
    return [
      <MultisigLink
        indexer={multisig?.indexer}
        address={multisig?.address}
        callHash={multisig?.callHash}
      />,
      <Flex>
        <AddressOrIdentity noLink={addressNoLink} address={multisig.address} />
      </Flex>,
      <ApprovingCell>
        <ApprovingText>
          {multisig.approvals?.length}
          <ApprovingSlashText>/</ApprovingSlashText>
          <ApprovingCountText>{multisig.threshold}</ApprovingCountText>
        </ApprovingText>
        <Dot style={{ margin: "0 2px" }} />
        <Tooltip
          tip={
            <SignatoriesWrapper>
              {multisig.signatories?.map((address) => (
                <AddressOrIdentity
                  key={address}
                  ellipsis={false}
                  address={address}
                />
              ))}
            </SignatoriesWrapper>
          }
        >
          <TextSecondary>{multisig.signatoriesCount}</TextSecondary>
        </Tooltip>
      </ApprovingCell>,
      <div>
        <div
          style={{
            wordBreak: "break-word",
          }}
        >
          {multisig?.call
            ? `${multisig.call.section}(${multisig.call.method})`
            : "--"}
        </div>
        <Tooltip tip={multisig.callHash}>
          <ColoredMonoLink
            to={`/multisigs/${multisig?.indexer?.blockHeight}-${multisig?.indexer?.extrinsicIndex}-${multisig?.address}`}
          >
            {hashEllipsis(multisig.callHash, 2, 4)}
          </ColoredMonoLink>
        </Tooltip>
      </div>,
      <TextTertiary>{time(multisig?.indexer?.blockTime)}</TextTertiary>,
      <Status color={STATUS_COLORS[multisig?.state?.name?.toUpperCase?.()]}>
        {multisig?.state?.name}
      </Status>,
      <ExtrinsicParametersDisplay extrinsic={multisig} />,
    ];
  });

  return <Table heads={multisigsHead} data={tableData} loading={loading} />;
}
