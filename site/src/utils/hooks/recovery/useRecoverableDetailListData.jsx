import { toPrecision } from "@osn/common";
import AddressOrIdentity from "../../../components/address";
import DetailedBlock from "../../../components/detail/block";
import ValueDisplay from "../../../components/displayValue";
import { TextSecondary, TextTertiary } from "../../../components/styled/text";
import useChainSettings from "../chain/useChainSettings";

export function useRecoverableDetailListData(recoverable) {
  const { decimals, symbol } = useChainSettings();

  return [
    {
      label: "Lost Account",
      value: (
        <AddressOrIdentity
          key={recoverable?.who}
          address={recoverable?.who}
          ellipsis={false}
        />
      ),
    },
    {
      label: "Created At",
      value: <DetailedBlock blockHeight={recoverable?.height} />,
    },
    {
      label: "Removed At",
      value: recoverable?.removedAt?.blockHeight ? (
        <DetailedBlock blockHeight={recoverable?.removedAt?.blockHeight} />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
    },
    {
      label: "Rescuer",
      value: recoverable?.rescuer ? (
        <AddressOrIdentity
          key={recoverable?.rescuer}
          address={recoverable?.rescuer}
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
          value={toPrecision(recoverable?.deposit, decimals)}
          symbol={symbol}
        />
      ),
    },
    {
      label: "Status",
      value: (
        <div
          style={{
            color: recoverable?.isActive
              ? "var(--fillPositive)"
              : "var(--fontTertiary)",
          }}
        >
          {recoverable?.isActive ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      label: "Threshold",
      value: <TextSecondary>{recoverable?.threshold}</TextSecondary>,
    },
    {
      label: "Friends",
      value: (
        <div>
          <TextSecondary>{recoverable?.friends?.length}</TextSecondary>
          {recoverable?.friends?.map((address) => (
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
