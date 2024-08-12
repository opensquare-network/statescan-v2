import { Link } from "react-router-dom";
import styled from "styled-components";
import { truncate } from "../../styles/tailwindcss";
import { proxyHead } from "../../utils/constants";
import { useChainBlockTime } from "../../utils/hooks/chain/useChainBlockTime";
import { timeRemain } from "../../utils/viewFuncs/time";
import AddressOrIdentity from "../address";
import DetailedBlock from "../detail/block";
import { Flex } from "../styled/flex";
import { TextTertiary } from "../styled/text";
import Table from "../table";
import FoldButton from "../table/body/row/foldButton";
import { TagThemed } from "../tag";
import Tooltip from "../tooltip";
import ProxyStatus from "./status";

const TypeCellWrapper = styled.div`
  ${truncate}
`;

function DelegatorCell({ data }) {
  // table cell has padding left(24) and right(24)
  const addressWidth = (data?.isPure ? 200 : 240) - 48;

  return (
    <Flex gap={8}>
      <AddressOrIdentity
        key={data.delegator}
        address={data.delegator}
        maxWidth={addressWidth}
      />
      {data?.isPure && <TagThemed>Pure</TagThemed>}
    </Flex>
  );
}

function TypeCell({ data }) {
  return (
    <Tooltip tip={data.type} style={{ maxWidth: 160 - 48 }}>
      <TypeCellWrapper>{data.type}</TypeCellWrapper>
    </Tooltip>
  );
}

export default function ProxyTable({ data = [], loading }) {
  const blockTime = useChainBlockTime();

  const tableData = data?.map?.((proxy) => {
    return [
      <DelegatorCell key={proxy.delegator} data={proxy} />,
      <Flex>
        <AddressOrIdentity key={proxy.delegatee} address={proxy.delegatee} />
      </Flex>,
      <TypeCell data={proxy} />,
      proxy?.delay
        ? [proxy?.delay, timeRemain(proxy?.delay * blockTime)]
        : [<TextTertiary>--</TextTertiary>, <TextTertiary>--</TextTertiary>],
      <DetailedBlock blockHeight={proxy?.indexer?.blockHeight} />,
      <ProxyStatus isRemoved={proxy?.isRemoved} />,
      <Link to={`/proxy/${proxy.proxyId}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return <Table heads={proxyHead} data={tableData} loading={loading} />;
}
