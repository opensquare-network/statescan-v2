import styled from "styled-components";
import { no_scroll_bar } from "../../styles";
import { FlexEnd } from "./flex";

export const Panel = styled.div`
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBase};
  box-shadow: ${(p) => p.theme.shadowPanel};
  border-radius: 8px;
  overflow: hidden;
`;

const PanelNoBordered = styled(Panel)`
  border: none;
  box-shadow: none;
  border-radius: 0;
`;

const PanelTableScrollArea = styled.div`
  overflow-x: scroll;
  ${no_scroll_bar};
`;

export function StyledPanelTableWrapper({
  footer,
  children,
  className,
  ...props
}) {
  return (
    <Panel {...props} className={className}>
      <PanelTableScrollArea>{children}</PanelTableScrollArea>
      {footer && <FlexEnd>{footer}</FlexEnd>}
    </Panel>
  );
}

export function StyledPanelTableWrapperNoBordered({
  footer,
  children,
  className,
  ...props
}) {
  return (
    <PanelNoBordered {...props} className={className}>
      <PanelTableScrollArea>{children}</PanelTableScrollArea>
      {footer && <FlexEnd>{footer}</FlexEnd>}
    </PanelNoBordered>
  );
}
