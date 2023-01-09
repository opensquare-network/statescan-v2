import styled from "styled-components";
import { Inter_12_500, Inter_14_600 } from "../../styles/text";
import ExternalLink from "../externalLink";
import CaretUprightIcon from "../icons/caretUpright";
import { Flex, FlexBetween } from "../styled/flex";
import { Panel } from "../styled/panel";

const GovernancePanel = styled(Panel)`
  border-radius: 4px;
  box-shadow: none;
  padding: 12px;
`;

const Logo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 4px;
`;

const SpaceName = styled.p`
  margin: 0;
  color: ${(p) => p.theme.fontPrimary};
  ${Inter_14_600};
`;

const ProjectName = styled.p`
  margin: 0;
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_12_500};
`;

const Link = styled(ExternalLink)`
  width: 244px;
  display: block;
  text-decoration: none;

  &:hover {
    ${GovernancePanel} {
      border-color: ${(p) => p.theme.strokeBoxSelected};
    }

    ${CaretUprightIcon} {
      path {
        stroke: ${(p) => p.theme.fontSecondary};
      }
    }
  }
`;

export default function Governance({
  spaceLogo,
  spaceName,
  projectName,
  link,
}) {
  return (
    <Link href={link}>
      <GovernancePanel>
        <FlexBetween>
          <Flex gap={12}>
            <Logo src={spaceLogo} alt="Space Logo" title={spaceName} />
            <div>
              <SpaceName>{spaceName}</SpaceName>
              <ProjectName>{projectName}</ProjectName>
            </div>
          </Flex>

          <Flex>
            <CaretUprightIcon />
          </Flex>
        </FlexBetween>
      </GovernancePanel>
    </Link>
  );
}
