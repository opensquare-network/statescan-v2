import styled from "styled-components";
import { Inter_12_500 } from "../../../styles/text";
import { FlexBetween, FlexColumn } from "../../styled/flex";

const Wrapper = styled(FlexColumn)`
  padding: 24px 0;
`;

const Label = styled.span`
  color: ${(p) => p.theme.fontSecondary};
  ${Inter_12_500};
`;

export default function AnalyticsChartBody() {
  return (
    <Wrapper gap={16}>
      <FlexBetween>
        <Label>Amount</Label>
        <Label>Transfer Counts</Label>
      </FlexBetween>

      <div>TODO</div>
    </Wrapper>
  );
}
