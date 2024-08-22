import styled from "styled-components";
import { Inter_12_600 } from "../../../styles/text";
import { Flex } from "../../styled/flex";

const Wrapper = styled(Flex)`
  color: ${(p) => p.theme.theme500};
  color: var(--theme500);
  user-select: none;
  ${Inter_12_600};
`;

const Cell = styled.div`
  cursor: pointer;
`;

export default function SwitchHead({ first, toggle, name }) {
  const names = Array.isArray(name) ? name : [name];

  return (
    <Wrapper>
      <Cell onClick={toggle}>{names[first ? 0 : 1]}</Cell>
    </Wrapper>
  );
}
