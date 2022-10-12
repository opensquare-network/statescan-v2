import styled from "styled-components";
import { Inter_12_500, Inter_20_700 } from "../../../styles/text";
import { OnlyDesktop } from "../../screen/onlyDesktop";
import { Flex } from "../../styled/flex";
import ThemedLink from "../../styled/link";

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
  &:hover {
    ${ContentValueTotal} {
      color: ${(p) => p.theme.theme500};
    }
  }
`;

export default function DataPanelItem({ icon, label, value, total, to }) {
  const resolveContentValue = (
    <>
      {value}
      {total && <ContentValueTotal> / {total}</ContentValueTotal>}
    </>
  );

  return (
    <div>
      <Flex>
        <OnlyDesktop>
          <IconWrapper>{icon}</IconWrapper>
        </OnlyDesktop>

        <div>
          <ContentLabel>{label}</ContentLabel>
          <ContentValue>
            {to ? (
              <Link to={to}>{resolveContentValue}</Link>
            ) : (
              resolveContentValue
            )}
          </ContentValue>
        </div>
      </Flex>
    </div>
  );
}
