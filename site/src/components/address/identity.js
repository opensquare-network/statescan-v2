import styled from "styled-components";
import IdentityIcon from "./identityIcon";
import { Overpass_Mono_14_500 } from "../../styles/text";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;

  svg {
    margin-right: 4px;
  }
`;

const Display = styled.span`
  ${Overpass_Mono_14_500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.fontPrimary};
`;

export default function Identity({ identity }) {
  if (!identity || identity?.info?.status === "NO_ID") {
    return null;
  }

  return (
    <Wrapper>
      <IdentityIcon identity={identity} />
      <Display>{identity?.info?.display}</Display>
    </Wrapper>
  );
}
