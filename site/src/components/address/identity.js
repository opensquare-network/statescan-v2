import styled from "styled-components";
import IdentityIcon from "./identityIcon";
import { Overpass_Mono_14_500 } from "../../styles/text";
import { relative } from "../../styles/tailwindcss";

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const IdentityIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  ${relative};
  top: -1px;
`;

const Display = styled.span`
  ${Overpass_Mono_14_500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.fontPrimary};
`;

export default function Identity({ maxWidth, identity }) {
  if (!identity || identity?.info?.status === "NO_ID") {
    return null;
  }

  return (
    <Wrapper style={{ maxWidth }}>
      <IdentityIconWrapper>
        <IdentityIcon identity={identity} />
      </IdentityIconWrapper>
      <Display>{identity?.info?.display}</Display>
    </Wrapper>
  );
}
