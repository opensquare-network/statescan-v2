import styled from "styled-components";
import { recoverablesHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import { ColoredLink } from "../../styled/link";
import Table from "../../table";
import { Inter_14_500 } from "../../../styles/text";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { TextTertiary } from "../../styled/text";

const FriendText = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  ${Inter_14_500};
  color: var(--fontPrimary);
`;

const FriendsWrapper = styled.div`
  * {
    color: var(--textPrimary);
    white-space: nowrap;
  }
`;

function FriendCell({ item }) {
  return (
    <FriendText>
      <div>
        <Tooltip tip="Threshold">{item?.threshold}</Tooltip>
      </div>
      <div style={{ color: "var(--fontTertiary)" }}>/</div>
      <div>
        <Tooltip
          tip={
            <FriendsWrapper>
              <div>All Friends:</div>
              {item?.friends?.map?.((address) => (
                <div key={address}>
                  <AddressOrIdentity
                    key={address}
                    address={address}
                    ellipsis={false}
                  />
                </div>
              ))}
            </FriendsWrapper>
          }
        >
          {item?.friends?.length}
        </Tooltip>
      </div>
    </FriendText>
  );
}

export default function RecoverablesTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((item) => {
    return [
      <ColoredLink to={`/blocks/${item?.height}`}>
        {item?.height?.toLocaleString?.()}
      </ColoredLink>,
      <div style={{ display: "flex" }}>
        <AddressOrIdentity key={item.who} address={item.who} />
      </div>,
      <FriendCell item={item} />,
      item?.delayPeriod?.toLocaleString?.(),
      <ValueDisplay
        value={toPrecision(item.deposit, decimals)}
        symbol={symbol}
      />,
      item.rescuer ? (
        <AddressOrIdentity key={item.rescuer} address={item.rescuer} />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
      <div
        style={{
          color: item?.isActive ? "var(--fillPositive)" : "var(--fontTertiary)",
        }}
      >
        {item?.isActive ? "Active" : "Inactive"}
      </div>,
    ];
  });

  return <Table data={tableData} heads={recoverablesHead} loading={loading} />;
}
