import styled from "styled-components";
import { Inter_12_500, Inter_20_700 } from "../../../styles/text";
import { Flex } from "../../styled/flex";

const Item = styled.div`
  width: 253.33px;
`;

const IconWrapper = styled.div`
  margin-right: 16px;
`;

const ContentLabel = styled.p`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  margin-bottom: 8px;
  ${Inter_12_500};
`;
const ContentValue = styled.p`
  margin: 0;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_20_700};
`;
const ContentValueTotal = styled.span`
  color: ${(p) => p.theme.fontTertiary};
`;

const ContentWrapper = styled.div``;

export default function DataPanelItem({ icon, label, value, total }) {
  return (
    <Item>
      <Flex>
        <IconWrapper>{icon}</IconWrapper>

        <ContentWrapper>
          <ContentLabel>{label}</ContentLabel>
          <ContentValue>
            {value}
            {total && <ContentValueTotal> / {total}</ContentValueTotal>}
          </ContentValue>
        </ContentWrapper>
      </Flex>
    </Item>
  );
}
