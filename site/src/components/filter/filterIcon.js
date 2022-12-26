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
          background: rgb(254, 228, 239);
        `
      : css`
          background: rgb(244, 244, 244);
        `}

  > svg {
    ${(p) =>
      p.active
        ? css`
            stroke: #f22279;
          `
        : css`
            stroke: #111111;
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
