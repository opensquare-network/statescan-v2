import { callsHead } from "../../utils/constants";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { Tag } from "../tag";
import ExtrinsicLink from "../extrinsic/link";
import React from "react";

export const toCallTableItem = (calls) => {
  return calls?.map((item) => {
    return [
      <ColoredLink
        to={`/calls/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}-${item?.indexer?.callIndex}`}
      >
        {item?.indexer?.blockHeight.toLocaleString()}-{item?.indexer?.callIndex}
      </ColoredLink>,
      <ExtrinsicLink indexer={item?.indexer} />,
      <ColoredLink to={`/blocks/${item?.indexer?.blockHeight}`}>
        {item?.indexer?.blockHeight.toLocaleString()}
      </ColoredLink>,
      item?.indexer?.blockTime,
      <Tag>{item?.method}</Tag>,
      `${item?.section}(${item?.method})`,
      <ExtrinsicParametersDisplay extrinsic={{ call: item }} />,
    ];
  });
};

/**
 * @description page call table
 * @property data
 */
export default function CallsTable(props) {
  const { data = [], loading } = props ?? {};

  return (
    <Table heads={callsHead} data={toCallTableItem(data)} loading={loading} />
  );
}
