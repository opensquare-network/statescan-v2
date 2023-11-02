import { callsHead, callsHeadSimpleMode } from "../../utils/constants";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";
import { ColoredLink } from "../styled/link";
import Table from "../table";
import { Tag } from "../tag";
import ExtrinsicLink from "../extrinsic/link";
import React from "react";
import { getIsSimpleMode } from "../../utils/env";

const toCallFields = (item) => [
  <ColoredLink
    to={`/calls/${item?.indexer?.blockHeight}-${item?.indexer?.extrinsicIndex}-${item?.indexer?.callIndex}`}
  >
    {item?.indexer?.blockHeight.toLocaleString()}-
    {item?.indexer?.extrinsicIndex}-{item?.indexer?.callIndex}
  </ColoredLink>,
  <ExtrinsicLink indexer={item?.indexer} />,
  <ColoredLink to={`/blocks/${item?.indexer?.blockHeight}`}>
    {item?.indexer?.blockHeight.toLocaleString()}
  </ColoredLink>,
  item?.indexer?.blockTime,
  <Tag>{item?.method}</Tag>,
  `${item?.section}(${item?.method})`,
];

export const toCallTableItemSimpleMode = (calls) => {
  return calls?.map((item) => toCallFields(item));
};

export const toCallTableItem = (calls) => {
  return calls?.map((item) => {
    return [
      ...toCallFields(item),
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
  const isSimpleMode = getIsSimpleMode();

  let head = [];
  let list = [];

  if (isSimpleMode) {
    list = toCallTableItemSimpleMode(data);
    head = callsHeadSimpleMode;
  } else {
    list = toCallTableItem(data);
    head = callsHead;
  }

  return <Table heads={head} data={list} loading={loading} />;
}
