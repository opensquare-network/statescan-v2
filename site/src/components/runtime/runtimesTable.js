import styled from "styled-components";
import { text_capitalize } from "../../styles/tailwindcss";
import { runtimesHead } from "../../utils/constants";
import { ColoredLink } from "../styled/link";
import Table from "../table";

const SpecName = styled.span`
  ${text_capitalize};
`;

/**
 * @description page runtimes table
 */
export default function RuntimesTable({ data = [], loading }) {
  const tableData = data?.map?.((item) => {
    return [
      <ColoredLink to={`/runtimes/${item.specVersion}`}>
        {item.specVersion}
      </ColoredLink>,
      <SpecName>{item.specName}</SpecName>,
      <ColoredLink to={`/blocks/${item.startHeight}`}>
        {item.startHeight?.toLocaleString?.()}
      </ColoredLink>,
      item.count.pallets,
      item.count.calls,
      item.count.events,
      item.count.storage,
      item.count.constants,
    ];
  });

  return <Table heads={runtimesHead} data={tableData} loading={loading} />;
}
