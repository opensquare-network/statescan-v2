import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { ColoredLink } from "../components/styled/link";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import { Tag as TagOrigin } from "../components/tag";
import api from "../services/api";
import { callsHead } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";

const Tag = styled(TagOrigin)`
  color: ${(p) => p.theme.fontSecondary};
  background-color: ${(p) => p.theme.fillBase};
`;

function Calls() {
  const location = useLocation();
  const [calls, setCalls] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    api
      .fetch("/calls", {
        page: page - 1,
      })
      .then(({ result }) => {
        setCalls(result?.items ?? []);
        setTotal(result?.total ?? 0);
        console.log(result);
      });
  }, [location, page]);

  const data = calls?.map((call) => {
    return [
      <ColoredLink
        to={`/call/${call?.indexer?.blockHeight}-${call?.indexer?.callIndex}`}
      >
        {call?.indexer?.blockHeight.toLocaleString()}-{call?.indexer?.callIndex}
      </ColoredLink>,
      <ColoredLink
        to={`/extrinsic/${call?.indexer?.blockHeight}-${call?.indexer?.extrinsicIndex}`}
      >
        {call?.indexer?.blockHeight.toLocaleString()}-
        {call?.indexer?.extrinsicIndex}
      </ColoredLink>,
      <ColoredLink to={`/block/${call?.indexer?.blockHeight}`}>
        {call?.indexer?.blockHeight.toLocaleString()}
      </ColoredLink>,
      call?.indexer?.blockTime,
      <Tag>{call?.method}</Tag>,
      `${call?.section}(${call?.method})`,
      call?.args,
    ];
  });

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Calls" }]} />

      <StyledPanelTableWrapper>
        <Table heads={callsHead} data={data} />
        <Pagination page={parseInt(page)} pageSize={10} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Calls;
