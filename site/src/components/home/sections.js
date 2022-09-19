import Container from "../layout/container";
import { Flex, FlexBetween } from "../styled/flex";
import { Panel } from "../styled/panel";
import styled from "styled-components";
import { Inter_18_700 } from "../../styles/text";

const Title = styled.h2`
  ${Inter_18_700};
`;

const Rows = styled.ul`
  width: 500px;
`;

const Row = styled.li`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

export default function Sections() {
  return (
    <Container>
      <FlexBetween>
        <div>
          <Title>Latest Blocks</Title>
          <Panel>
            <Rows>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <Row key={i}>
                    <Flex>
                      <span>icon</span>
                      <span>2,848,056</span>
                      <span>31 secs ago</span>
                    </Flex>

                    <Flex>
                      <span>DqrE...wRtN</span>
                      <span>
                        Extrinsics 2<span>Events3</span>
                      </span>
                    </Flex>
                  </Row>
                ))}
            </Rows>
          </Panel>
        </div>
      </FlexBetween>
    </Container>
  );
}
