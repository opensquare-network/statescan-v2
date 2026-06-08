import { useState } from "react";
import styled, { css } from "styled-components";
import CaretDownIcon from "../icons/caretDownIcon";
import { Inter_14_600 } from "../../styles/text";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 24px;
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: ${(p) => p.theme.strokeBase};
`;

const ToggleButton = styled.button`
  ${Inter_14_600};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 140px;
  height: 36px;
  padding: 0px;
  color: ${(p) => p.theme.fontPrimary};
  background: ${(p) => p.theme.fillPanel};
  border: 1px solid ${(p) => p.theme.strokeBox};
  border-radius: 10px;
  cursor: pointer;

  :hover {
    border-color: ${(p) => p.theme.strokeBox};
  }

  ${(p) =>
    p.open &&
    css`
      border-color: ${(p) => p.theme.strokeBox};
    `}

  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme.theme100};
  }
`;

const ArrowIcon = styled(CaretDownIcon)`
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;

  ${(p) =>
    p.open &&
    css`
      transform: rotate(180deg);
    `}

  path {
    stroke: ${(p) => p.theme.strokeBox};
  }
`;

const Content = styled.div`
  margin-top: 24px;
`;

export default function Advanced({
  title = "Advanced",
  defaultOpen = false,
  children,
  className,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Wrapper className={className}>
      <ToggleRow>
        <Line />
        <ToggleButton
          type="button"
          aria-expanded={open}
          open={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          {title}
          <ArrowIcon open={open} />
        </ToggleButton>
        <Line />
      </ToggleRow>
      {open && <Content>{children}</Content>}
    </Wrapper>
  );
}
