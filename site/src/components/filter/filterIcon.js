import styled, { css } from "styled-components";
import { ReactComponent as FilterSVG } from "../icons/filter.svg";

const Wrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(p) =>
    p.active
      ? css`
          background: ${(p) => p.theme.theme100};
        `
      : css`
          background: ${(p) => p.theme.fillAlpha};
        `}

  > svg {
    ${(p) =>
      p.active
        ? css`
            stroke: ${(p) => p.theme.theme500};
          `
        : css`
            stroke: ${(p) => p.theme.fontSecondary};
          `}
  }
`;

export default function FilterIcon({ active, onClick }) {
  return (
    <Wrapper active={active} onClick={onClick}>
      <FilterSVG />
    </Wrapper>
  );
}
