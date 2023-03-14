import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../../services/api";
import { subSquareSummaryApi } from "../../../services/urls";
import { lgcss, smcss } from "../../../styles/responsive";
import {
  flex,
  flex_col,
  gap_y,
  grid_cols,
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
import {
  OverviewPanel,
  OverviewItemsWrapper as OverviewItemsWrapperOrigin,
} from "../overview/styled";

const OverviewItemsWrapper = styled(OverviewItemsWrapperOrigin)`
  ${lgcss(grid_cols(4))};
  ${smcss(grid_cols(2))};
`;

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

export default function GovernanceSection() {
  const { subSquareWebsite } = useChainSettings();
  const chain = useChain();
  const chainApi = useChainApi();

  const [summary, setSummary] = useState({});
  const [councilMembers, setCouncilMembrs] = useState([]);
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
    electionsInfo.then((info) => setCouncilMembrs(info.members));

    const tcMembers = chainApi?.derive?.technicalCommittee?.members?.();
    tcMembers.then(setTechCommMembers);
  }, [chainApi]);

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <CategoryWrapper>
          <CategoryTitle>OpenGov</CategoryTitle>
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
          />
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
          />
        </CategoryWrapper>

        <CategoryWrapper>
          <CategoryTitle>Democracy</CategoryTitle>
          <OverviewItem
            icon={<ReferendaSquareIcon />}
            label="Referenda"
            value={
              <span>
                {summary?.referenda?.active || 0}{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/referenda`}
                  >
                    {summary?.referenda?.all || 0}
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
          <OverviewItem
            icon={<ProposalsSquareIcon />}
            label="Proposals"
            value={
              <span>
                {summary?.publicProposals?.active || 0}{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/proposals`}
                  >
                    {summary?.publicProposals?.all || 0}
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
          <OverviewItem
            icon={<ProposalsSquareIcon />}
            label="External Proposals"
            value={
              <span>
                {summary?.externalProposals?.active || 0}{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/externals`}
                  >
                    {summary?.externalProposals?.all || 0}
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
        </CategoryWrapper>

        <CategoryWrapper>
          <CategoryTitle>Council</CategoryTitle>
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
          />
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
          />
        </CategoryWrapper>

        <CategoryWrapper>
          <CategoryTitle>Tech.comm.</CategoryTitle>
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
          />
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
          />
        </CategoryWrapper>
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
