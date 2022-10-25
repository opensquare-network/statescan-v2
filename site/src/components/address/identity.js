import styled from "styled-components";
import IdentityIcon from "./identityIcon";
import { SF_Mono_14_500 } from "../../styles/text";
import { Flex } from "../styled/flex";

const Wrapper = styled(Flex)`
  width: 100%;
  height: 20px;
  position: relative;

  svg {
    position: absolute;
  }

  a {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  font-weight: 500;
`;

const Display = styled.span`
  padding-left: 24px;
  ${SF_Mono_14_500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.fontPrimary};
`;

export default function Identity({ identity, fontSize = 14 }) {
  if (!identity || identity?.info?.status === "NO_ID") {
    return null;
  }

  return (
    <Wrapper>
      <IdentityIcon identity={identity} />
      <Display style={{ fontSize }}>{identity?.info?.display}</Display>
    </Wrapper>
  );
}
