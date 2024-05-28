import styled from "styled-components";
import { RECOVERABLE_STATUS, recoverablesHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import { ColoredLink } from "../../styled/link";
import Table from "../../table";
import { Inter_14_500 } from "../../../styles/text";
import Tooltip from "../../tooltip";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { TextTertiary } from "../../styled/text";
import FoldButton from "../../table/body/row/foldButton";
import { Link } from "react-router-dom";
import AddressesCellText from "../../table/addressesCell/text";
import { Flex } from "../../styled/flex";
import capitalize from "lodash.capitalize";

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
        <Tooltip tip="Threshold">{item?.threshold}</Tooltip>
      </div>
      <div style={{ color: "var(--fontTertiary)" }}>/</div>
      <div>
        <AddressesCellText title="All Friends" addresses={item?.friends} />
      </div>
    </FriendText>
  );
}

export default function RecoverablesTable({ data = [], loading }) {
  const { decimals, symbol } = useChainSettings();

  const tableData = data?.map?.((item) => {
    return [
      <Flex>
        <AddressOrIdentity key={item.who} address={item.who} />
      </Flex>,
      <ColoredLink to={`/blocks/${item?.height}`}>
        {item?.height?.toLocaleString?.()}
      </ColoredLink>,
      <FriendsCell item={item} />,
      item?.delayPeriod?.toLocaleString?.(),
      <ValueDisplay
        value={toPrecision(item.deposit, decimals)}
        symbol={symbol}
      />,
      item.rescuer ? (
        <Flex>
          <AddressOrIdentity key={item.rescuer} address={item.rescuer} />
        </Flex>
      ) : (
        <TextTertiary>-</TextTertiary>
      ),
      <div
        style={{
          color: item?.isActive ? "var(--fillPositive)" : "var(--fontTertiary)",
        }}
      >
        {item?.isActive
          ? capitalize(RECOVERABLE_STATUS.ACTIVE)
          : capitalize(RECOVERABLE_STATUS.INACTIVE)}
      </div>,
      <Link to={`/recoverables/${item.who}-${item.height}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return <Table data={tableData} heads={recoverablesHead} loading={loading} />;
}
