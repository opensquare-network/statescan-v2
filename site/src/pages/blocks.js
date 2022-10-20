import { hashEllipsis } from "../utils/viewFuncs/text";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { blocksHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import styled from "styled-components";
import Api from "../services/api";
import { SF_Mono_14_500 } from "../styles/text";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Tooltip from "../components/tooltip";
import FinalizedState from "../components/states/finalizedState";
import Address from "../components/address";

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
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    setLoading(true);
    Api.fetch(`/blocks`, {
      page: getPageFromQuery(location) - 1,
      pageSize,
    })
      .then(({ result }) => {
        setBlocks(result?.items ?? []);
        setTotal(result?.total ?? 0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, pageSize]);

  const data =
    blocks?.map((block, index) => {
      return [
        <ColoredLink key={`${index}-1`} to={`/block/${block?.height}`}>
          {block?.height?.toLocaleString()}
        </ColoredLink>,
        block?.time,
        <FinalizedState finalized={block?.isFinalized} />,
        <Tooltip tip={block.hash}>
          <ColoredMonoLink to={`/block/${block?.height}`}>
            {hashEllipsis(block.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        <Tooltip tip={block.validator}>
          <Address address={block.validator} />
        </Tooltip>,
        block?.extrinsicsCount,
        block?.eventsCount,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <StyledPanelTableWrapper>
        <Table heads={blocksHead} data={data} loading={loading} />
        <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Blocks;
