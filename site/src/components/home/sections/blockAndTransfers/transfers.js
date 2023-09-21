import { Anchor, AnchorWrapper, Section, StyledPanel, Title } from "../styled";
import React from "react";
import { useSelector } from "react-redux";
import {
  latestSignedTransfersLoadingSelector,
  latestSignedTransfersSelector,
} from "../../../../store/reducers/socketSlice";
import LatestTransfers from "../latestTransfers";

export default function Transfers() {
  const transfers = useSelector(latestSignedTransfersSelector);
  const transfersLoading = useSelector(latestSignedTransfersLoadingSelector);

  return (
    <Section>
      <Title>Signed Transfers</Title>
      <StyledPanel>
        <LatestTransfers transfers={transfers} loading={transfersLoading} />
        <AnchorWrapper>
          <Anchor
            disabled={!transfers?.length || transfersLoading}
            to={"/transfers"}
          >
            View All
          </Anchor>
        </AnchorWrapper>
      </StyledPanel>
    </Section>
  );
}
