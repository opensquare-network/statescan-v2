import { ReactComponent as CheckIcon } from "../components/icons/check.svg";
import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500, SF_Mono_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { time, timeDuration } from "../utils/viewFuncs/time";
import { Flex } from "../components/styled/flex";
import { withCopy } from "../HOC/withCopy";

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${SF_Mono_14_500};
`;

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextTertiary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontTertiary};
`;
const TextSecondaryWithCopy = withCopy(TextSecondary);
const ColoredMonoLinkWithCopy = withCopy(ColoredMonoLink);

function DetailedTime({ ts }) {
  return (
    <Flex style={{ gap: 8 }}>
      <TextSecondary>{time(ts)}</TextSecondary>
      <TextTertiary>{timeDuration(ts)}</TextTertiary>
    </Flex>
  );
}

function Block() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [block, setBlock] = useState(null);

  useEffect(() => {
    if (id) {
      Api.fetch(`/blocks/${id}`, {}).then(({ result: block }) => {
        setBlock(block);
        const data = {
          "Block Time": <DetailedTime ts={block?.time} />,
          Status: <CheckIcon />,
          Hash: <TextSecondaryWithCopy>{block?.hash}</TextSecondaryWithCopy>,
          "Parent Hash": (
            <ColoredMonoLinkWithCopy
              to={`/block/${(Number.parseInt(block?.height) - 1).toString()}`}
            >
              {block?.parentHash}
            </ColoredMonoLinkWithCopy>
          ),
          "State Root": (
            <TextSecondaryWithCopy>{block?.stateRoot}</TextSecondaryWithCopy>
          ),
          "Extrinsics Root": (
            <TextSecondaryWithCopy>
              {block?.extrinsicsRoot}
            </TextSecondaryWithCopy>
          ),
          Validator: (
            <ColoredMonoLinkWithCopy to={""}>
              {block?.validator}
            </ColoredMonoLinkWithCopy>
          ),
        };
        setListData(data);
      });
    }
  }, [id]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Blocks", path: "/blocks" },
          { name: block?.height ?? "..." },
        ]}
      />
      <Panel>
        <List data={listData} />
      </Panel>
    </Layout>
  );
}

export default Block;
