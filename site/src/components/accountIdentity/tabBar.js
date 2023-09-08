import startCase from "lodash.startcase";
import styled, { css } from "styled-components";
import { no_scroll_bar } from "../../styles";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;

  border-bottom: 1px solid var(--strokeBase);
  overflow-y: auto;
  ${no_scroll_bar};
`;

const TabButton = styled.div`
  cursor: pointer;
  display: flex;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;

  border-radius: 18px;
  border: 1px solid var(--strokeBox);

  color: var(--fontPrimary);

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;

  ${(p) =>
    p.active &&
    css`
      border-color: var(--theme500);
      color: var(--theme500);
    `}
`;

const TabIcon = styled.div`
  display: inline-flex;
  svg path {
    fill: var(--fontSecondary);
    fill-opacity: 0.6;
    ${(p) =>
      p.active &&
      css`
        fill: var(--theme500);
        fill-opacity: 1;
      `}
  }
`;

export default function TabBar({ tabs = [], selectedTab, setSelectedTab }) {
  return (
    <Wrapper>
      {tabs.map(({ icon, name }) => (
        <TabButton
          key={name}
          active={name === selectedTab}
          onClick={() => setSelectedTab(name)}
        >
          <TabIcon active={name === selectedTab}>{icon}</TabIcon>
          <span style={{ whiteSpace: "nowrap" }}>{startCase(name)}</span>
        </TabButton>
      ))}
    </Wrapper>
  );
}
