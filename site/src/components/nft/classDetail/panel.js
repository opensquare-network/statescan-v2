import styled from "styled-components";
import SquareBox from "../squareBox";
import NftImage from "../image";
import List from "../../../components/list";
import { toNftDetailItem } from "../../../utils/viewFuncs/toDetailItem";
import { useMemo } from "react";
import NftInfo from "../info";
import Divider from "../../styled/divider";

const Wrapper = styled.div`
  margin-bottom: 16px;
  padding: 24px 0 24px 0;
  display: flex;
  @media screen and (max-width: 1064px) {
    flex-flow: column;
  }
  background: ${(p) => p.theme.fillPanel};
  gap: 16px;

  > :first-child {
    margin: 0 0 0 24px;
    @media screen and (max-width: 1064px) {
      margin: 0 24px 0 24px;
    }
    border: none;
    box-shadow: none;

    // Styled the square box
    > div {
      max-width: 480px;
      @media screen and (min-width: 1064px) {
        width: 480px;
      }
    }
  }

  > :nth-child(2) {
    padding: 0;
    margin-right: 24px;
    border: none;
    box-shadow: none;
    flex-grow: 1;
  }
`;

export default function Panel({ nftClass }) {
  const classId = nftClass?.classId;
  const parsedMetadata = nftClass?.parsedMetadata;

  const listData = useMemo(
    () => (nftClass ? toNftDetailItem(classId, nftClass) : {}),
    [classId, nftClass],
  );

  return (
    <Wrapper>
      <div>
        <SquareBox background={parsedMetadata?.resource?.metadata?.background}>
          <NftImage parsedMetadata={parsedMetadata} />
        </SquareBox>
      </div>
      <List
        header={
          <>
            <NftInfo
              title={parsedMetadata?.name ?? "[Unrecognized]"}
              description={parsedMetadata?.description ?? "-"}
            />
            <Divider />
          </>
        }
        data={listData}
      />
    </Wrapper>
  );
}
