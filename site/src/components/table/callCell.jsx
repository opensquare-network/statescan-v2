import styled from "styled-components";
import Tooltip from "../tooltip";

const Wrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function CallCell({ call = {} }) {
  const text = `${call.section}(${call.method})`;

  return (
    <Tooltip tip={text}>
      <Wrapper>{text}</Wrapper>
    </Tooltip>
  );
}
