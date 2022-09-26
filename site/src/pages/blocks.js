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
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";

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
  const location = useLocation();
  const [blocks, setBlocks] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    setBlocks(null);
    Api.fetch(`/blocks`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setBlocks(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location.search]);

  const data =
    blocks?.map((block, index) => {
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
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <StyledPanel>
        <Table heads={blocksHead} data={data} />
        <Pagination page={parseInt(page)} pageSize={10} total={total} />
      </StyledPanel>
    </Layout>
  );
}

export default Blocks;
