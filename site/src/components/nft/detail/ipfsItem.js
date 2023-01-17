import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import IpfsLink from "../../ipfsLink";

const Wrapper = styled.div`
  display: flex;
  ${Inter_14_500};
  color: ${(p) => p.theme.fontSecondary};

  > :first-child {
    margin-right: 9.65px;
  }
`;

export default function IpfsItem({ cid }) {
  return (
    <Wrapper>
      <span>IPFS</span>
      <IpfsLink cid={cid} />
    </Wrapper>
  );
}
