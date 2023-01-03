import { ReactComponent as CheckIcon } from "../components/icons/check.svg";
import { ReactComponent as CrossIcon } from "../components/icons/cross.svg";
import { hashEllipsis } from "../utils/viewFuncs/text";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { extrinsicsHead, LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import styled from "styled-components";
import { Overpass_Mono_14_500 } from "../styles/text";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Filter from "../components/filter";
import * as queryString from "query-string";
import Tooltip from "../components/tooltip";
import { useExtrinsicFilter } from "../utils/hooks/extrinsicFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanExtrinsicList,
  extrinsicFetchList,
  extrinsicListLoadingSelector,
  extrinsicListSelector,
} from "../store/reducers/extrinsicSlice";
import ExtrinsicParametersDisplay from "../components/extrinsicParametersDisplay";
import omit from "lodash.omit";

const ColoredLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
`;

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${Overpass_Mono_14_500};
`;

function Extrinsics() {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const filters = useExtrinsicFilter();

  const list = useSelector(extrinsicListSelector);
  const loading = useSelector(extrinsicListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      extrinsicFetchList(
        page - 1,
        pageSize,
        {
          signed_only: "true",
          ...omit(queryString.parse(location.search), ["page"]),
        },
        { signal: controller.signal },
      ),
    );

    return () => controller.abort();
  }, [dispatch, location, page, pageSize]);

  useEffect(() => {
    dispatch(cleanExtrinsicList());
  }, [dispatch]);

  const data =
    list?.items?.map((extrinsic, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}-
          {extrinsic?.indexer?.extrinsicIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/block/${extrinsic?.indexer?.blockHeight}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        extrinsic?.indexer?.blockTime,
        <Tooltip tip={extrinsic.hash}>
          <ColoredMonoLink
            to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
          >
            {hashEllipsis(extrinsic.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        `${extrinsic?.call?.section}(${extrinsic?.call?.method})`,
        <ExtrinsicParametersDisplay extrinsic={extrinsic} />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Extrinsics" }]} />
      <Filter
        title={`All ${list?.total?.toLocaleString?.() ?? ""} extrinsics`}
        data={filters}
      />
      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={extrinsicsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Extrinsics;
