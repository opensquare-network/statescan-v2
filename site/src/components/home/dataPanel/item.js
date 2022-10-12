import styled from "styled-components";
import { Inter_12_500, Inter_20_700 } from "../../../styles/text";
import { Flex } from "../../styled/flex";
import ThemedLink from "../../styled/link";

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

const Link = styled(ThemedLink)`
  ${ContentValueTotal} {
    &:hover {
      color: ${(p) => p.theme.theme500};
    }
  }
`;

const ContentWrapper = styled.div``;

export default function DataPanelItem({ icon, label, value, total, to }) {
  const resolveContentValue = (
    <>
      {value}
      {total && <ContentValueTotal> / {total}</ContentValueTotal>}
    </>
  );

  return (
    <Item>
      <Flex>
        <IconWrapper>{icon}</IconWrapper>

        <ContentWrapper>
          <ContentLabel>{label}</ContentLabel>
          <ContentValue>
            {to ? (
              <Link to={to}>{resolveContentValue}</Link>
            ) : (
              resolveContentValue
            )}
          </ContentValue>
        </ContentWrapper>
      </Flex>
    </Item>
  );
}
