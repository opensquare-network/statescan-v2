import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../../services/api";
import { subSquareSummaryApi } from "../../../services/urls";
import {
  flex,
  flex_col,
  gap_y,
  m,
  m_b,
  no_underline,
  text_primary,
  text_tertiary,
  underline,
} from "../../../styles/tailwindcss";
import { Inter_14_600 } from "../../../styles/text";
import useChain from "../../../utils/hooks/chain/useChain";
import { useChainApi } from "../../../utils/hooks/chain/useChainApi";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import ExternalLink from "../../externalLink";
import FellowshipSquareIcon from "../../icons/fellowshipSquareIcon";
import HolderSquareIcon from "../../icons/holderSquareIcon";
import MotionsSquareIcon from "../../icons/motionsSquareIcon";
import ProposalsSquareIcon from "../../icons/proposalsSquareIcon";
import ReferendaSquareIcon from "../../icons/referendaSquareIcon";
import OverviewItem from "../overview/item";
import { OverviewPanel, OverviewItemsWrapper } from "../overview/styled";

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
  const { subSquareWebsite } = useChainSettings();
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
            <span>
              {summary?.gov2Referenda?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/referenda`}>
                  {summary?.gov2Referenda?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
            <span>
              {summary?.fellowshipReferenda?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/fellowship`}>
                  {summary?.fellowshipReferenda?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
            <span>
              {summary?.referenda?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/democracy/referenda`}>
                  {summary?.referenda?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
            <span>
              {summary?.publicProposals?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/democracy/proposals`}>
                  {summary?.publicProposals?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
            <span>
              {summary?.externalProposals?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/democracy/externals`}>
                  {summary?.externalProposals?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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

  if (has(summary, ["motions"])) {
    const councilItems = [];

    if (summary.motions) {
      councilItems.push(
        <OverviewItem
          icon={<MotionsSquareIcon />}
          label="Motions"
          value={
            <span>
              {summary?.motions?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/council/motions`}>
                  {summary?.motions?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
            <span>
              {summary?.techCommMotions?.active || 0}{" "}
              <Tertiary>
                /{" "}
                <ExternalLink href={`${subSquareWebsite}/techcomm/proposals`}>
                  {summary?.techCommMotions?.all || 0}
                </ExternalLink>
              </Tertiary>
            </span>
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
