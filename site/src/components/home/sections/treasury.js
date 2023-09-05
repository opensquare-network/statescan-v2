import { abbreviateBigNumber, toPrecision } from "@osn/common";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../../services/api";
import { estimateBlocksTime } from "../../../services/chainApi";
import { dotreasuryOverviewApi } from "../../../services/urls";
import { breakpoint } from "../../../styles/responsive";
import {
  grid_cols,
  no_underline,
  text_primary,
  text_quaternary,
  text_tertiary,
  underline,
} from "../../../styles/tailwindcss";
import { Inter_12_700 } from "../../../styles/text";
import { TREASURY_ACCOUNT } from "../../../utils/constants";
import useChain from "../../../utils/hooks/chain/useChain";
import { useChainApi } from "../../../utils/hooks/chain/useChainApi";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import ExternalLink from "../../externalLink";
import AssetSquareIcon from "../../icons/assetSquareIcon";
import BountiesSquareIcon from "../../icons/bountiesSquareIcon";
import NextBurnSquareIcon from "../../icons/nextBurnSquareIcon";
import OpenGovSquareIcon from "../../icons/opengovSquareIcon";
import ProposalsSquareIcon from "../../icons/proposalsSquareIcon";
import SpendPeriodSquareIcon from "../../icons/spendPeriodSquareIcon";
import TipsSquareIcon from "../../icons/tipsSquareIcon";
import ToBeAwardedSquareIcon from "../../icons/toBeAwardedSquareIcon";
import TimePeriod from "../../timePeriod";
import OverviewItem from "../overview/item";
import {
  OverviewPanel,
  OverviewItemsWrapper as OverviewItemsWrapperOrigin,
} from "../overview/styled";
import OverviewItemValueWithAll from "../overview/valueWithAll";

const OverviewItemsWrapper = styled(OverviewItemsWrapperOrigin)`
  ${breakpoint(1294, grid_cols(3))};
  ${breakpoint(981, grid_cols(2))};
`;

const Tertiary = styled.span`
  ${text_tertiary};

  a {
    color: inherit;
    ${no_underline};

    &:hover {
      ${underline};
      ${text_primary};
    }
  }
`;
const SpendPeriodSlash = styled.span`
  ${text_quaternary};
`;
const SpendPeriodSmall = styled.small`
  ${Inter_12_700};
`;

export default function TreasurySection() {
  const [treasuryOverview, setTreasuryOverview] = useState({});
  const [treasuryBurnt, setTreasuryBurnt] = useState();
  const [treasurySpendPeriod, setTreasurySpendPeriod] = useState();

  const chain = useChain();
  const chainApi = useChainApi();
  const { decimals: precision, symbol, treasuryWebsite } = useChainSettings();

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

  useEffect(() => {
    if (!chainApi) {
      return;
    }

    async function fetchTreasuryBurnt() {
      const account = (
        await chainApi.query.system.account(TREASURY_ACCOUNT)
      ).toJSON();

      setTreasuryBurnt({
        free: account ? toPrecision(account.data.free, precision) : 0,
        burnPercent: toPrecision(chainApi.consts.treasury.burn, 6),
      });
    }

    fetchTreasuryBurnt();
  }, [chainApi, precision]);

  useEffect(() => {
    if (!chainApi) {
      return;
    }

    async function fetchSpendPeriod() {
      const bestNumber = await chainApi.derive.chain.bestNumber();
      const spendPeriod = chainApi.consts.treasury.spendPeriod;
      const goneBlocks = bestNumber.mod(spendPeriod);

      setTreasurySpendPeriod({
        blockNumber: spendPeriod.toNumber(),
        periodTime: await estimateBlocksTime(chain, spendPeriod),
        restBlocks: spendPeriod.sub(goneBlocks).toNumber(),
        restTime: await estimateBlocksTime(chain, spendPeriod.sub(goneBlocks)),
        progress: goneBlocks.muln(100).div(spendPeriod).toNumber(),
      });
    }

    fetchSpendPeriod();
  }, [chainApi, chain]);

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<AssetSquareIcon />}
          label="Available"
          value={
            <span>
              {abbreviateBigNumber(treasuryBurnt?.free || 0)}{" "}
              <Tertiary>{symbol}</Tertiary>
            </span>
          }
        />
        <OverviewItem
          icon={<ToBeAwardedSquareIcon />}
          label="To be awarded"
          value={
            <span>
              {abbreviateBigNumber(toBeAwardedValue)}{" "}
              <Tertiary>{symbol}</Tertiary>
            </span>
          }
        />
        <OverviewItem
          icon={<NextBurnSquareIcon />}
          label="Next burn"
          value={
            <span>
              {abbreviateBigNumber(
                treasuryBurnt?.free * treasuryBurnt?.burnPercent || 0,
              )}{" "}
              <Tertiary>{symbol}</Tertiary>
            </span>
          }
        />
        <OverviewItem
          icon={<SpendPeriodSquareIcon />}
          label="Spend period"
          value={
            treasurySpendPeriod && (
              <span>
                <TimePeriod
                  ms={treasurySpendPeriod?.restTime}
                  renderUnit={(unit) => <Tertiary>{unit}</Tertiary>}
                />
                <SpendPeriodSmall>
                  <SpendPeriodSlash>/</SpendPeriodSlash>{" "}
                  <TimePeriod
                    ms={treasurySpendPeriod?.periodTime}
                    renderUnit={(unit) => <Tertiary>{unit}</Tertiary>}
                  />
                </SpendPeriodSmall>
              </span>
            )
          }
        />
        <OverviewItem
          icon={<OpenGovSquareIcon />}
          label="OpenGov"
          value={
            <OverviewItemValueWithAll
              active={treasuryOverview?.count?.referenda?.unFinished}
              label="OpenGov"
              all={treasuryOverview?.count?.referenda?.all}
              link={`${treasuryWebsite}/referenda`}
            />
          }
        />
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="Proposals"
          value={
            <OverviewItemValueWithAll
              active={treasuryOverview?.count?.proposal?.unFinished}
              label="Proposals"
              all={treasuryOverview?.count?.proposal?.all}
              link={`${treasuryWebsite}/proposals`}
            />
          }
        />
        <OverviewItem
          icon={<TipsSquareIcon />}
          label="Tips"
          value={
            <OverviewItemValueWithAll
              active={treasuryOverview?.count?.tip?.unFinished}
              label="Tips"
              all={treasuryOverview?.count?.tip?.all}
              link={`${treasuryWebsite}/tips`}
            />
          }
        />
        <OverviewItem
          icon={<BountiesSquareIcon />}
          label="Bounties"
          value={
            <OverviewItemValueWithAll
              active={treasuryOverview?.count?.bounty?.unFinished}
              label="Bounties"
              all={treasuryOverview?.count?.bounty?.all}
              link={`${treasuryWebsite}/bounties`}
            />
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
