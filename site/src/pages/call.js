import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import { ColoredLink } from "../components/styled/link";
import api from "../services/api";
import { Tag as TagOrigin } from "../components/tag";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { DetailedTime } from "../components/styled/time";
import { Inter_14_500 } from "../styles/text";

const Tag = styled(TagOrigin)`
  color: ${(p) => p.theme.fontSecondary};
  background-color: ${(p) => p.theme.fillBase};
`;

const Link = styled(ColoredLink)`
  ${Inter_14_500}
`;

const CallText = styled.span`
  color: ${(p) => p.theme.fontSecondary};
  ${Inter_14_500};
`;

function Call() {
  const { id } = useParams();
  const [call, setCall] = useState(null);
  const [list, setList] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }

    api.fetch(`/calls/${id}`).then(({ result: data }) => {
      setCall(data);

      const { indexer, method, section } = data ?? {};

      const list = {
        "Call ID": (
          <Link to={`/call/${id}`}>
            {indexer?.blockHeight.toLocaleString()}-{indexer?.callIndex}
          </Link>
        ),
        "Extrinsics ID": (
          <Link
            to={`/extrinsic/${indexer?.blockHeight}-${indexer?.extrinsicIndex}`}
          >
            {indexer?.blockHeight?.toLocaleString()}-{indexer?.extrinsicIndex}
          </Link>
        ),
        Block: (
          <Link to={`/block/${indexer?.blockHeight}`}>
            {indexer?.blockHeight?.toLocaleString()}
          </Link>
        ),
        Timestamp: <DetailedTime ts={indexer?.blockTime} />,
        Method: <Tag>{method}</Tag>,
        Call: (
          <CallText>
            {section}({method})
          </CallText>
        ),
      };
      setList(list);
    });
  }, [id]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Calls", path: "/calls" },
          {
            name: call
              ? `${call?.indexer?.blockHeight.toLocaleString()}-${
                  call?.indexer?.callIndex
                }`
              : "...",
          },
        ]}
      />

      <Panel>
        <List data={list} />
      </Panel>
    </Layout>
  );
}

export default Call;
