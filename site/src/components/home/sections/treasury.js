import { abbreviateBigNumber, toPrecision } from "@osn/common";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../../services/api";
import { dotreasuryOverviewApi } from "../../../services/urls";
import { text_tertiary } from "../../../styles/tailwindcss";
import useChain from "../../../utils/hooks/chain/useChain";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BountiesSquareIcon from "../../icons/bountiesSquareIcon";
import NextBurnSquareIcon from "../../icons/nextBurnSquareIcon";
import OpenGovSquareIcon from "../../icons/opengovSquareIcon";
import ProposalsSquareIcon from "../../icons/proposalsSquareIcon";
import SpendPeriodSquareIcon from "../../icons/spendPeriodSquareIcon";
import TipsSquareIcon from "../../icons/tipsSquareIcon";
import ToBeAwardedSquareIcon from "../../icons/toBeAwardedSquareIcon";
import OverviewItem from "../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../overview/styled";

const ValueSymbol = styled.span`
  ${text_tertiary};
`;
const ValueTotal = styled.span`
  ${text_tertiary};
`;

export default function TreasurySection() {
  const [treasuryOverview, setTreasuryOverview] = useState({});

  const chain = useChain();
  const { decimals: precision, symbol } = useChainSettings();

  const toBeAwarded = BigNumber(
    treasuryOverview?.toBeAwarded?.total ?? 0,
  ).toNumber();
  const toBeAwardedValue = BigNumber(
    toPrecision(toBeAwarded, precision),
  ).toNumber();

  useEffect(() => {
    api.fetch(dotreasuryOverviewApi(chain)).then(({ result }) => {
      setTreasuryOverview(result);
    });
  }, [chain]);

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<AssetSquareIcon />}
          label="Available"
          value={"TODO"}
        />
        <OverviewItem
          icon={<ToBeAwardedSquareIcon />}
          label="To be awarded"
          value={
            <span>
              {abbreviateBigNumber(toBeAwardedValue)}{" "}
              <ValueSymbol>{symbol}</ValueSymbol>
            </span>
          }
        />
        <OverviewItem
          icon={<NextBurnSquareIcon />}
          label="Next burn"
          value={"TODO"}
        />
        <OverviewItem
          icon={<SpendPeriodSquareIcon />}
          label="Spend period"
          value={"TODO"}
        />
        <OverviewItem
          icon={<OpenGovSquareIcon />}
          label="OpenGov"
          value={
            <>
              {treasuryOverview?.count?.referenda?.unFinished ?? 0}
              <ValueTotal>
                {" "}
                / {treasuryOverview?.count?.referenda?.all ?? 0}
              </ValueTotal>
            </>
          }
        />
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="Proposals"
          value={
            <>
              {treasuryOverview?.count?.proposal?.unFinished ?? 0}
              <ValueTotal>
                {" "}
                / {treasuryOverview?.count?.proposal?.all ?? 0 ?? 0}
              </ValueTotal>
            </>
          }
        />
        <OverviewItem
          icon={<TipsSquareIcon />}
          label="Tips"
          value={
            <>
              {treasuryOverview?.count?.tip?.unFinished ?? 0}
              <ValueTotal>
                {" "}
                / {treasuryOverview?.count?.tip?.all ?? 0}
              </ValueTotal>
            </>
          }
        />
        <OverviewItem
          icon={<BountiesSquareIcon />}
          label="Bounties"
          value={
            <>
              {treasuryOverview?.count?.bounty?.unFinished ?? 0}
              <ValueTotal>
                {" "}
                / {treasuryOverview?.count?.bounty?.all ?? 0}
              </ValueTotal>
            </>
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
