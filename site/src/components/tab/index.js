import styled, { css } from "styled-components";
import { Inter_12_600, Inter_20_700 } from "../../styles/text";
import { abbreviateBigNumber } from "@osn/common";

const TabWrapper = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 16px;
  margin-right: 32px;
  gap: 8px;
`;

const highlight = css`
  color: ${(p) => p.theme.fontPrimary};
  cursor: pointer;
`;

const active = css`
  ${highlight};
  border-bottom: 3px solid ${(p) => p.theme.theme500};
`;

const TabText = styled.div`
  padding-bottom: 12px;
  ${Inter_20_700};
  color: ${(p) => p.theme.fontTertiary};
  border-bottom: 3px solid ${(p) => p.theme.fillBase};
  text-transform: capitalize;

  &:hover {
    ${highlight};
  }
  ${(p) => p.active && active};
`;

const TabTag = styled.div`
  padding: 2px 6px;
  margin-bottom: 12px;
  ${Inter_12_600};
  color: ${(p) => p.theme.theme500};
  background: ${(p) => p.theme.theme100};
  border-radius: 16px;
`;

function Tab({ text, count, active, onClick }) {
  return (
    <TabWrapper onClick={onClick}>
      <TabText active={active}>{text}</TabText>
      {count > -1 && <TabTag>{abbreviateBigNumber(count)}</TabTag>}
    </TabWrapper>
  );
}

export default Tab;
