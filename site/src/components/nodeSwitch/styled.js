import styled from "styled-components";

export const DropDownContentWrapper = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 999;
  width: 320px;
  padding: 8px 12px;

  border-radius: 8px;
  border: 1px solid var(--strokeBase);
  background: var(--fillPopup);
  box-shadow: 0px 0.5px 1px 0px rgba(27, 32, 44, 0.02),
    0px 2px 4px 0px rgba(27, 32, 44, 0.03),
    0px 6px 16px 0px rgba(27, 32, 44, 0.05);
`;
