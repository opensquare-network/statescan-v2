import styled from "styled-components";
import { Inter_12_600 } from "../../styles/text";
import Tooltip from "../tooltip/index";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;

  border: 1px solid ${(p) => p.theme.strokeBox};
  border-radius: 12px;

  ${Inter_12_600};
  color: ${(p) => p.theme.fontSecondary};
`;

export default function Label({ name, description }) {
  return (
    <div>
      <Tooltip tip={description}>
        <Wrapper>{name}</Wrapper>
      </Tooltip>
    </div>
  );
}
