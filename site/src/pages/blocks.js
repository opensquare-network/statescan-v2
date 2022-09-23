import { ReactComponent as CheckIcon } from "../components/icons/check.svg";
import { addressEllipsis, hashEllipsis } from "../utils/viewFuncs/text";
import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { blocksHead } from "../utils/constants";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import styled from "styled-components";
import Api from "../services/api";
import { SF_Mono_14_500 } from "../styles/text";
import { no_scroll_bar } from "../styles";

const StyledPanel = styled(Panel)`
  overflow-x: scroll;
  ${no_scroll_bar};
`;

const ColoredLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
`;

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${SF_Mono_14_500};
`;

function Blocks() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Api.fetch(`/blocks`).then(({ result }) => {
      setBlocks(result?.items ?? []);
    });
  }, []);

  const data = blocks.map((block, index) => {
    return [
      <ColoredLink key={`${index}-1`} to={`/block/${block?.height}`}>
        {block?.height?.toLocaleString()}
      </ColoredLink>,
      block?.time,
      <CheckIcon />,
      <ColoredMonoLink to={""}>{hashEllipsis(block.hash)}</ColoredMonoLink>,
      <ColoredMonoLink to={""}>
        {addressEllipsis(block.validator)}
      </ColoredMonoLink>,
      block?.extrinsicsCount,
      block?.eventsCount,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <StyledPanel>
        <Table heads={blocksHead} data={data} />
      </StyledPanel>
    </Layout>
  );
}

export default Blocks;
