import {
  blockExtrinsicsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../../utils/constants";
import Table from "../../table";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useEffect, useState } from "react";
import Api from "../../../services/api";
import { useLocation } from "react-router-dom";
import { hashEllipsis } from "../../../utils/viewFuncs/text";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as CrossIcon } from "../../icons/cross.svg";
import { ColoredLink, ColoredMonoLink } from "../../styled/link";
import Tooltip from "../../tooltip";

function ExtrinsicsTable({ height }) {
  const location = useLocation();
  const [extrinsics, setExtrinsics] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!height) {
      return;
    }
    setExtrinsics(null);
    Api.fetch(`/blocks/${height}/extrinsics`, {
      page: getPageFromQuery(location) - 1,
      pageSize,
    }).then(({ result }) => {
      setExtrinsics(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location, pageSize, height]);

  const data =
    extrinsics?.map((extrinsic, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}-
          {extrinsic?.indexer?.extrinsicIndex}
        </ColoredLink>,
        <Tooltip tip={extrinsic.hash}>
          <ColoredMonoLink to={""}>
            {hashEllipsis(extrinsic.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        `${extrinsic?.call?.section}(${extrinsic?.call?.method})`,
        extrinsic?.call,
      ];
    }) ?? null;

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockExtrinsicsHead} data={data} />
      <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default ExtrinsicsTable;
