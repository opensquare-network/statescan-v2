import { toPrecision } from "@osn/common";
import AddressOrIdentity from "../../../components/address";
import DetailedBlock from "../../../components/detail/block";
import ValueDisplay from "../../../components/displayValue";
import { TextSecondary, TextTertiary } from "../../../components/styled/text";
import useChainSettings from "../chain/useChainSettings";

export function useRecoveryDetailListData(recovery) {
  const { decimals, symbol } = useChainSettings();

  return [
    {
      label: "Lost Account",
      value: (
        <AddressOrIdentity
          key={recovery?.lostAccount}
          address={recovery?.lostAccount}
          ellipsis={false}
        />
      ),
    },
    {
      label: "Created At",
      value: <DetailedBlock blockHeight={recovery?.created} />,
    },
    {
      label: "Rescuer",
      value: recovery?.rescuerAccount ? (
        <AddressOrIdentity
          key={recovery?.rescuerAccount}
          address={recovery?.rescuerAccount}
          ellipsis={false}
        />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
    },
    {
      label: "Deposit",
      value: (
        <ValueDisplay
          value={toPrecision(recovery?.deposit, decimals)}
          symbol={symbol}
        />
      ),
    },
    {
      label: "Status",
      value: (
        <div
          style={{
            color: recovery?.isClosed
              ? "var(--fontTertiary)"
              : "var(--fillPositive)",
          }}
        >
          {recovery?.isClosed ? "Completed" : "Active"}
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      label: "Threshold",
      value: <TextSecondary>{recovery?.threshold}</TextSecondary>,
    },
    {
      label: "Friends",
      value: (
        <div>
          <TextSecondary>{recovery?.allFriends?.length}</TextSecondary>
          {recovery?.allFriends?.map((address) => (
            <div key={address}>
              <AddressOrIdentity
                key={address}
                address={address}
                ellipsis={false}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];
}
