import styled from "styled-components";
import { callsHead } from "../../utils/constants";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { Tag as TagOrigin } from "../tag";

const Tag = styled(TagOrigin)`
  color: ${(p) => p.theme.fontSecondary};
  background-color: ${(p) => p.theme.fillBase};
`;

/**
 * @description page call table
 * @property data
 */
export default function CallTable(props) {
  const { data = [] } = props ?? {};

  const tableData = data?.map((item) => {
    return [
      <ColoredLink
        to={`/call/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}-${item?.indexer?.callIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-{item?.indexer?.callIndex}
      </ColoredLink>,
      <ColoredLink
        to={`/extrinsic/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-
        {item?.indexer?.extrinsicIndex}
      </ColoredLink>,
      <ColoredLink to={`/block/${item?.indexer?.blockHeight}`}>
        {item?.indexer?.blockHeight.toLocaleString()}
      </ColoredLink>,
      item?.indexer?.blockTime,
      <Tag>{item?.method}</Tag>,
      `${item?.section}(${item?.method})`,
      item?.args,
    ];
  });

  return <Table heads={callsHead} data={tableData} />;
}
