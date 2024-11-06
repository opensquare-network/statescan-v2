import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import LatestTransfers from "../latestTransfers";
import useLatestTransfers from "../../../../hooks/overview/useLatestTransfers";

export default function Transfers() {
  const { transfers, loading } = useLatestTransfers();

  return (
    <Section>
      <Title>Signed Transfers</Title>
      <StyledPanel>
        <LatestTransfers transfers={transfers} loading={loading} />
        <AnchorWrapper>
          <Anchor disabled={!transfers?.length || loading} to={"/transfers"}>
            View All
          </Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
