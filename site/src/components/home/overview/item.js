import styled from "styled-components";
import { Inter_12_500, Inter_18_700 } from "../../../styles/text";
import ThemedLink from "../../styled/link";
import TooltipOrigin from "../../tooltip";
import CircledInfoIcon from "../../icons/circledInfoIcon";
import { flex, hidden } from "../../../styles/tailwindcss";
import { breakpoint } from "../../../styles/responsive";

const Tooltip = styled(TooltipOrigin)`
  display: inline-flex;
  margin-left: 4px;
`;

const IconWrapper = styled.div`
  ${flex};
  margin-right: 16px;

  ${breakpoint(640, hidden)};
`;

const ContentLabel = styled.div`
  color: ${(p) => p.theme.fontTertiary};
  margin: 0;
  margin-bottom: 8px;
  ${Inter_12_500};
  display: inline-flex;
`;
const ContentValue = styled.div`
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_18_700};
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

const Wrapper = styled.div`
  ${flex};
`;

export default function OverviewItem({ icon, label, value, total, to, tip }) {
  const resolveContentValue = (
    <>
      {value}
      {total && <ContentValueTotal> / {total}</ContentValueTotal>}
    </>
  );

  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>

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
    </Wrapper>
  );
}
