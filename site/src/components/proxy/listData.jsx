import { useChainBlockTime } from "../../utils/hooks/chain/useChainBlockTime";
import { timeRemain } from "../../utils/viewFuncs/time";
import AddressOrIdentity from "../address";
import DetailedBlock from "../detail/block";
import List from "../list";
import { Flex } from "../styled/flex";
import { TextSecondary, TextTertiary } from "../styled/text";
import { TagThemed } from "../tag";
import ProxyStatus from "./status";

export default function ProxyListData({
  loading,
  isPure,
  delegator,
  blockHeight,
  delegatee,
  type,
  delay,
  isRemoved,
}) {
  const blockTime = useChainBlockTime();
  const remainMs = (delay || 0) * blockTime;

  const data = [
    {
      label: "Delegator",
      value: (
        <Flex gap={8}>
          <AddressOrIdentity key={delegator} address={delegator} />
          {isPure && <TagThemed>Pure</TagThemed>}
        </Flex>
      ),
    },
    {
      label: "Created At",
      value: <DetailedBlock blockHeight={blockHeight} />,
    },
    {
      label: "Delegatee",
      value: (
        <Flex>
          <AddressOrIdentity key={delegatee} address={delegatee} />
        </Flex>
      ),
    },
    {
      label: "Type",
      value: <TextSecondary>{type}</TextSecondary>,
    },
    {
      label: "Delay",
      value:
        delay <= 0 ? (
          <TextTertiary>-</TextTertiary>
        ) : (
          <Flex gap={8}>
            <TextSecondary>{delay?.toLocaleString?.()}</TextSecondary>
            <TextTertiary>{timeRemain(remainMs)}</TextTertiary>
          </Flex>
        ),
    },
    {
      label: "Status",
      value: <ProxyStatus isRemoved={isRemoved} />,
    },
  ];

  return <List data={loading ? [] : data} />;
}
