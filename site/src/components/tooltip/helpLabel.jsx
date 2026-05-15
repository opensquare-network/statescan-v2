import styled from "styled-components";
import QuestionIcon from "../icons/question";
import Tooltip from ".";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === "right" ? "flex-end" : "flex-start"};
  gap: 6px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

const IconTooltip = styled(Tooltip)`
  display: inline-flex;
  align-items: center;
  height: 16px;
  margin: 0;
  line-height: 0;
`;

const Icon = styled(QuestionIcon)`
  display: block;
  width: 16px;
  height: 16px;
`;

export default function HelpLabel({
  children,
  tip,
  align = "left",
  fullWidth = false,
}) {
  return (
    <Wrapper $align={align} $fullWidth={fullWidth}>
      {children}
      <IconTooltip tip={tip}>
        <Icon />
      </IconTooltip>
    </Wrapper>
  );
}
