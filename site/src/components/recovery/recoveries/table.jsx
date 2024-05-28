import styled from "styled-components";
import { recoveriesHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import { ColoredLink } from "../../styled/link";
import Table from "../../table";
import { Inter_14_500 } from "../../../styles/text";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { TextSecondary, TextTertiary } from "../../styled/text";
import FoldButton from "../../table/body/row/foldButton";
import { Link } from "react-router-dom";
import AddressesCellText from "../../table/addressesCell/text";
import Dot from "../../dot";

const FriendText = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  ${Inter_14_500};
  color: var(--fontPrimary);
`;

function FriendsCell({ item }) {
  return (
    <FriendText>
      <div>
        <AddressesCellText title="Vouched Friends" addresses={item?.friends} />
      </div>
      <div style={{ color: "var(--fontTertiary)" }}>/</div>
      <TextSecondary>
        <Tooltip tip="Threshold">{item?.threshold}</Tooltip>
      </TextSecondary>
      <Dot style={{ margin: "0 2px" }} />
      <TextSecondary>
        <AddressesCellText title="All Friends" addresses={item?.allFriends} />
      </TextSecondary>
    </FriendText>
  );
}

export default function RecoveriesTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((item) => {
    return [
      <div style={{ display: "flex" }}>
        <AddressOrIdentity key={item.lostAccount} address={item.lostAccount} />
      </div>,
      <ColoredLink to={`/blocks/${item?.created}`}>
        {item?.created?.toLocaleString?.()}
      </ColoredLink>,
      item.rescuerAccount ? (
        <AddressOrIdentity
          key={item.rescuerAccount}
          address={item.rescuerAccount}
        />
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
      <FriendsCell item={item} />,
      <ValueDisplay
        value={toPrecision(item.deposit, decimals)}
        symbol={symbol}
      />,
      <div
        style={{
          color: item?.isClosed ? "var(--fontTertiary)" : "var(--fillPositive)",
        }}
      >
        {item?.isClosed ? "Completed" : "Active"}
      </div>,
      <Link
        to={`/recoveries/${item.lostAccount}-${item.rescuerAccount}-${item.created}`}
      >
        <FoldButton fold />
      </Link>,
    ];
  });

  return <Table data={tableData} heads={recoveriesHead} loading={loading} />;
}
