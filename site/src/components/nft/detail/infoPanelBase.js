import styled from "styled-components";
import NftImage from "../image";
import List from "../../../components/list";
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

  border: 1px solid ${(p) => p.theme.strokeBase};
  box-shadow: ${(p) => p.theme.shadowPanel};
  border-radius: 8px;

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
    margin-right: 24px;
    flex-grow: 1;
  }
`;

const HeaderWrapper = styled.div`
  padding-left: 24px;
  @media screen and (max-width: 900px) {
    padding-left: 0;
  }
`;

export default function InfoPanelBase({ parsedMetadata, listData }) {
  return (
    <Wrapper>
      <div>
        <NftImage parsedMetadata={parsedMetadata} />
      </div>
      <div>
        <List
          header={
            <HeaderWrapper>
              <NftInfo
                title={parsedMetadata?.name ?? "[Unrecognized]"}
                description={parsedMetadata?.description ?? "-"}
              />
              <Divider />
            </HeaderWrapper>
          }
          data={listData}
        />
      </div>
    </Wrapper>
  );
}
