import { hashEllipsis } from "../utils/viewFuncs/text";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { blocksHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import styled from "styled-components";
import { Overpass_Mono_14_500 } from "../styles/text";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Tooltip from "../components/tooltip";
import FinalizedState from "../components/states/finalizedState";
import AddressOrIdentity from "../components/address";
import { useDispatch, useSelector } from "react-redux";
import {
  blockFetchList,
  blockListLoadingSelector,
  blockListSelector,
  clearBlockList,
} from "../store/reducers/blockSlice";
import { Flex } from "../components/styled/flex";

const ColoredLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
`;

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${Overpass_Mono_14_500};
`;

function Blocks() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(blockListSelector);
  const loading = useSelector(blockListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      blockFetchList(page - 1, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    dispatch(clearBlockList());
  }, [dispatch]);

  const data =
    list?.items?.map((block, index) => {
      return [
        <ColoredLink key={`${index}-1`} to={`/block/${block?.height}`}>
          {block?.height?.toLocaleString()}
        </ColoredLink>,
        block?.time,
        <Flex>
          <FinalizedState finalized={block?.isFinalized} />
        </Flex>,
        <Tooltip tip={block.hash}>
          <ColoredMonoLink to={`/block/${block?.height}`}>
            {hashEllipsis(block.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        <Tooltip tip={block.validator}>
          <AddressOrIdentity address={block.validator} />
        </Tooltip>,
        block?.extrinsicsCount,
        block?.eventsCount,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Blocks" }]} />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={blocksHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Blocks;
