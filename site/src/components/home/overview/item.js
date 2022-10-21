import styled from "styled-components";
import { Inter_12_500, Inter_20_700 } from "../../../styles/text";
import { PC } from "../../styled/responsive";
import { Flex } from "../../styled/flex";
import ThemedLink from "../../styled/link";
import TooltipOrigin from "../../tooltip";
import { ReactComponent as CircledInfoIcon } from "../../icons/circled-info.svg";

const Tooltip = styled(TooltipOrigin)`
  display: inline-flex;
  margin-left: 4px;
`;

const IconWrapper = styled(Flex)`
  margin-right: 16px;
`;

const ContentLabel = styled.p`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  margin-bottom: 8px;
  ${Inter_12_500};
  display: inline-flex;
`;
const ContentValue = styled.p`
  margin: 0;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_20_700};
`;
const ContentValueTotal = styled.span`
  color: ${(p) => p.theme.fontTertiary};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled(ThemedLink)`
  &:hover {
    ${ContentValueTotal} {
      color: ${(p) => p.theme.theme500};
    }
  }
`;

export default function OverviewItem({ icon, label, value, total, to, tip }) {
  const resolveContentValue = (
    <>
      {value}
      {total && <ContentValueTotal> / {total}</ContentValueTotal>}
    </>
  );

  return (
    <div>
      <Flex>
        <PC>
          <IconWrapper>{icon}</IconWrapper>
        </PC>

        <ContentWrapper>
          <ContentLabel>
            {label}
            {tip && (
              <Tooltip tip={tip}>
                <CircledInfoIcon />
              </Tooltip>
            )}
          </ContentLabel>
          <ContentValue>
            {to ? (
              <Link to={to}>{resolveContentValue}</Link>
            ) : (
              resolveContentValue
            )}
          </ContentValue>
        </ContentWrapper>
      </Flex>
    </div>
  );
}
