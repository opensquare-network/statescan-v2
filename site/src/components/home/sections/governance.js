import styled from "styled-components";
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

export default function GovernanceSection() {
  const { subSquareWebsite } = useChainSettings();

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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/referenda`}>
                    16
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/fellowship`}>
                    16
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/referenda`}
                  >
                    16
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/proposals`}
                  >
                    16
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink
                    href={`${subSquareWebsite}/democracy/externals`}
                  >
                    16
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/council/motions`}>
                    16
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
          <OverviewItem
            icon={<HolderSquareIcon />}
            label="Members"
            value={
              <span>
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/council/members`}>
                    16
                  </ExternalLink>
                </Tertiary>
              </span>
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
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/techcomm/proposals`}>
                    16
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
          <OverviewItem
            icon={<HolderSquareIcon />}
            label="Members"
            value={
              <span>
                3{" "}
                <Tertiary>
                  /{" "}
                  <ExternalLink href={`${subSquareWebsite}/techcomm/members`}>
                    16
                  </ExternalLink>
                </Tertiary>
              </span>
            }
          />
        </CategoryWrapper>
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
