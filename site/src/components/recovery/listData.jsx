import List from "../list";
import { toPrecision } from "@osn/common";
import { TextSecondary, TextTertiary } from "../styled/text";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import AddressOrIdentity from "../address";
import DetailedBlock from "../detail/block";
import ValueDisplay from "../displayValue";
import isNil from "lodash.isnil";

export default function RecoveryListData({
  loading,
  lostAccount,
  createdAt,
  removedAt,
  rescuer,
  deposit,
  status,
  threshold,
  friends = [],
}) {
  const { decimals, symbol } = useChainSettings();

  const data = [
    {
      label: "Lost Account",
      value: (
        <AddressOrIdentity
          key={lostAccount}
          address={lostAccount}
          ellipsis={false}
        />
      ),
    },
    {
      label: "Created At",
      value: <DetailedBlock blockHeight={createdAt} copy />,
    },
    !isNil(removedAt) && {
      label: "Removed At",
      value: removedAt?.blockHeight ? (
        <DetailedBlock blockHeight={removedAt?.blockHeight} copy />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
    },
    {
      label: "Rescuer",
      value: rescuer ? (
        <AddressOrIdentity key={rescuer} address={rescuer} ellipsis={false} />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
    },
    {
      label: "Deposit",
      value: (
        <ValueDisplay value={toPrecision(deposit, decimals)} symbol={symbol} />
      ),
    },
    {
      label: "Status",
      value: status,
    },
    {
      type: "divider",
    },
    {
      label: "Threshold",
      value: <TextSecondary>{threshold}</TextSecondary>,
    },
    {
      label: "Friends",
      value: (
        <div>
          <TextSecondary>{friends?.length}</TextSecondary>
          {friends?.map((address) => (
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
  ].filter(Boolean);

  return <List data={loading ? [] : data} />;
}
