import { blockExtrinsicsHead } from "../../../utils/constants";
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

function ExtrinsicsTable({ height }) {
  const location = useLocation();
  const [extrinsics, setExtrinsics] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    if (!height) {
      return;
    }
    setExtrinsics(null);
    Api.fetch(`/blocks/${height}/extrinsics`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setExtrinsics(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location, height]);

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
        <ColoredMonoLink to={""}>
          {hashEllipsis(extrinsic.hash)}
        </ColoredMonoLink>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        `${extrinsic?.call?.section}(${extrinsic?.call?.method})`,
        extrinsic?.call,
      ];
    }) ?? null;

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockExtrinsicsHead} data={data} />
      <Pagination page={parseInt(page)} pageSize={10} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default ExtrinsicsTable;
