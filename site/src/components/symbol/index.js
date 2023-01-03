import styled from "styled-components";
import { Inter_14_600 } from "../../styles/text";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const Name = styled.span`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

export default function Symbol({ symbol, detail }) {
  return (
    <Wrapper>
      <Icon src={detail?.icon ?? "/imgs/icons/default.svg"} alt="logo" />
      <Name>{symbol}</Name>
    </Wrapper>
  );
}
