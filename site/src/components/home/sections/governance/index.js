import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../../../services/api";
import { subSquareSummaryApi } from "../../../../services/urls";
import {
  flex,
  flex_col,
  gap_y,
  m,
  m_b,
  text_primary,
} from "../../../../styles/tailwindcss";
import { Inter_14_600 } from "../../../../styles/text";
import useChain from "../../../../utils/hooks/chain/useChain";
import { useChainApi } from "../../../../utils/hooks/chain/useChainApi";
import useChainSettings from "../../../../utils/hooks/chain/useChainSettings";
import ExternalLink from "../../../externalLink";
import FellowshipSquareIcon from "../../../icons/fellowshipSquareIcon";
import HolderSquareIcon from "../../../icons/holderSquareIcon";
import MotionsSquareIcon from "../../../icons/motionsSquareIcon";
import ProposalsSquareIcon from "../../../icons/proposalsSquareIcon";
import ReferendaSquareIcon from "../../../icons/referendaSquareIcon";
import OverviewItem from "../../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../../overview/styled";
import { Tertiary } from "./styled";
import ValueWithAll from "./valueWithAll";
import BountiesSquareIcon from "../../../icons/bountiesSquareIcon";

const CategoryWrapper = styled.div`
  ${flex};
  ${flex_col};
  ${gap_y(16)};
`;

const CategoryTitle = styled.h4`
  ${Inter_14_600};
  ${text_primary};
  ${m(0)};
  ${m_b(8)};
`;

const MembersValue = styled(Tertiary)`
  ${text_primary};
`;

/**
 * @param {string | string[]} keys
 */
function has(obj, keys = []) {
  keys = Array.isArray(keys) ? keys : [keys];
  return keys.some((k) => !!obj[k]);
}

/** quick resolve childs key */
function withChildKeys(childs = []) {
  return childs.map((child, idx) => <Fragment key={idx}>{child}</Fragment>);
}

export default function GovernanceSection() {
  const { subSquareWebsite, modules } = useChainSettings();
  const chain = useChain();
  const chainApi = useChainApi();

  const [summary, setSummary] = useState({});
  const [councilMembers, setCouncilMembers] = useState([]);
  const [techCommMembers, setTechCommMembers] = useState([]);

  useEffect(() => {
    api.fetch(subSquareSummaryApi(chain)).then(({ result }) => {
      setSummary(result);
    });
  }, [chain]);

  useEffect(() => {
    if (!chainApi) {
      return;
    }

    const electionsInfo = chainApi?.derive?.elections?.info?.();
    electionsInfo.then((info) => setCouncilMembers(info.members));

    const tcMembers = chainApi?.derive?.technicalCommittee?.members?.();
    tcMembers.then(setTechCommMembers);
  }, [chainApi]);

  const overviewItems = [];

  if (has(summary, ["gov2Referenda", "fellowshipReferenda"])) {
    const gov2Items = [];

    if (summary.gov2Referenda) {
      gov2Items.push(
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Referenda"
          value={
            <ValueWithAll
              active={summary?.gov2Referenda?.active}
              all={summary?.gov2Referenda?.all}
              link="referenda"
            />
          }
        />,
      );
    }

    if (summary.fellowshipReferenda) {
      gov2Items.push(
        <OverviewItem
          icon={<FellowshipSquareIcon />}
          label="Fellowship"
          value={
            <ValueWithAll
              active={summary?.fellowshipReferenda?.active}
              all={summary?.fellowshipReferenda?.all}
              link="fellowship"
            />
          }
        />,
      );
    }

    overviewItems.push(
      <CategoryWrapper>
        <CategoryTitle>OpenGov</CategoryTitle>
        {withChildKeys(gov2Items)}
      </CategoryWrapper>,
    );
  }

  if (has(summary, ["referenda", "publicProposals", "externalProposals"])) {
    const democracyItems = [];

    if (summary.referenda) {
      democracyItems.push(
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Referenda"
          value={
            <ValueWithAll
              active={summary?.referenda?.active}
              all={summary?.referenda?.all}
              link="democracy/referenda"
            />
          }
        />,
      );
    }

    if (summary.publicProposals) {
      democracyItems.push(
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="Proposals"
          value={
            <ValueWithAll
              active={summary?.publicProposals?.active}
              all={summary?.publicProposals?.all}
              link="democracy/proposals"
            />
          }
        />,
      );
    }

    if (summary.externalProposals) {
      democracyItems.push(
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="External Proposals"
          value={
            <ValueWithAll
              active={summary?.externalProposals?.active}
              all={summary?.externalProposals?.all}
              link="democracy/externals"
            />
          }
        />,
      );
    }

    overviewItems.push(
      <CategoryWrapper>
        <CategoryTitle>Democracy</CategoryTitle>
        {withChildKeys(democracyItems)}
      </CategoryWrapper>,
    );
  }

  if (
    has(summary, ["treasuryProposals", "bounties", "childBounties"]) &&
    !modules.treasury
  ) {
    const treasuryItems = [];
    if (modules.governance?.treasury?.proposal) {
      treasuryItems.push(
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="Proposals"
          value={
            <ValueWithAll
              active={summary?.treasuryProposals?.active}
              all={summary?.treasuryProposals?.all}
              link="treasury/proposals"
            />
          }
        />,
      );
    }

    if (modules.governance?.treasury?.bounties) {
      treasuryItems.push(
        <OverviewItem
          icon={<BountiesSquareIcon />}
          label="Bounties"
          value={
            <ValueWithAll
              active={summary?.bounties?.active}
              all={summary?.bounties?.all}
              link="treasury/bounties"
            />
          }
        />,
      );
    }

    overviewItems.push(
      <CategoryWrapper>
        <CategoryTitle>Treasury</CategoryTitle>
        {withChildKeys(treasuryItems)}
      </CategoryWrapper>,
    );
  }

  if (has(summary, ["motions"])) {
    const councilItems = [];

    if (summary.motions) {
      councilItems.push(
        <OverviewItem
          icon={<MotionsSquareIcon />}
          label="Motions"
          value={
            <ValueWithAll
              active={summary?.motions?.active}
              all={summary?.motions?.all}
              link="council/motions"
            />
          }
        />,
      );
    }

    councilItems.push(
      <OverviewItem
        icon={<HolderSquareIcon />}
        label="Members"
        value={
          <MembersValue>
            <ExternalLink href={`${subSquareWebsite}/council/members`}>
              {councilMembers.length}
            </ExternalLink>
          </MembersValue>
        }
      />,
    );

    overviewItems.push(
      <CategoryWrapper>
        <CategoryTitle>Council</CategoryTitle>
        {withChildKeys(councilItems)}
      </CategoryWrapper>,
    );
  }

  if (has(summary, ["techCommMotions"])) {
    const techCommItems = [];

    if (summary.techCommMotions) {
      techCommItems.push(
        <OverviewItem
          icon={<ProposalsSquareIcon />}
          label="Proposals"
          value={
            <ValueWithAll
              active={summary?.techCommMotions?.active}
              all={summary?.techCommMotions?.all}
              link="techcomm/proposals"
            />
          }
        />,
      );
    }

    techCommItems.push(
      <OverviewItem
        icon={<HolderSquareIcon />}
        label="Members"
        value={
          <MembersValue>
            <ExternalLink href={`${subSquareWebsite}/techcomm/members`}>
              {techCommMembers.length}
            </ExternalLink>
          </MembersValue>
        }
      />,
    );

    overviewItems.push(
      <CategoryWrapper>
        <CategoryTitle>Tech.comm.</CategoryTitle>
        {withChildKeys(techCommItems)}
      </CategoryWrapper>,
    );
  }

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        {withChildKeys(overviewItems)}
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
