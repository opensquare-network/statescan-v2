import capitalize from "lodash.capitalize";
import { PROXY_STATUS, proxyHead } from "../../utils/constants";
import AddressOrIdentity from "../address";
import { Flex } from "../styled/flex";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { TagThemed } from "../tag";
import { Link } from "react-router-dom";
import FoldButton from "../table/body/row/foldButton";

function DelegatorCell({ data }) {
  return (
    <Flex gap={8}>
      <AddressOrIdentity key={data.delegator} address={data.delegator} />
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
      Number(proxy?.delay).toLocaleString(),
      <ColoredLink to={`/blocks/${proxy?.indexer?.blockHeight}`}>
        {proxy?.indexer?.blockHeight?.toLocaleString?.()}
      </ColoredLink>,
      <div
        style={{
          color: proxy?.isRemoved
            ? "var(--fillNegative)"
            : "var(--fillPositive)",
        }}
      >
        {proxy?.isRemoved
          ? capitalize(PROXY_STATUS.REMOVED)
          : capitalize(PROXY_STATUS.ACTIVE)}
      </div>,
      <Link to={`/proxy/${proxy.proxyId}`}>
        <FoldButton fold />
      </Link>,
    ];
  });

  return <Table heads={proxyHead} data={tableData} loading={loading} />;
}
