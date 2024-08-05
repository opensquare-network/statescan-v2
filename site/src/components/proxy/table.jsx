import { Link } from "react-router-dom";
import { proxyHead } from "../../utils/constants";
import AddressOrIdentity from "../address";
import DetailedBlock from "../detail/block";
import { Flex } from "../styled/flex";
import Table from "../table";
import FoldButton from "../table/body/row/foldButton";
import { TagThemed } from "../tag";
import ProxyStatus from "./status";

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

export default function ProxyTable({ data = [], loading }) {
  const tableData = data?.map?.((proxy) => {
    return [
      <DelegatorCell key={proxy.delegator} data={proxy} />,
      <Flex>
        <AddressOrIdentity key={proxy.delegatee} address={proxy.delegatee} />
      </Flex>,
      proxy.type,
      proxy?.delay,
      <DetailedBlock blockHeight={proxy?.indexer?.blockHeight} />,
      <ProxyStatus isRemoved={proxy?.isRemoved} />,
      <Link to={`/proxy/${proxy.proxyId}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return <Table heads={proxyHead} data={tableData} loading={loading} />;
}
