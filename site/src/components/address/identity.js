import styled from "styled-components";
import IdentityIcon from "./identityIcon";
import { SF_Mono_12_500 } from "../../styles/text";
import { Flex } from "../styled/flex";

const Wrapper = styled(Flex)`
  margin-bottom: 8px;
  width: 100%;
  height: 20px;

  svg {
    margin-right: 8px;
  }

  a {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  color: #111;
  font-weight: 500;
`;

const Display = styled.span`
  margin-right: 8px;
  ${SF_Mono_12_500};
`;

export default function Identity({ identity }) {
  if (!identity || identity?.info?.status === "NO_ID") {
    return null;
  }

  return (
    <Wrapper>
      <IdentityIcon identity={identity} />
      <Display>
        <span>{identity?.info?.display}</span>{" "}
      </Display>
    </Wrapper>
  );
}
