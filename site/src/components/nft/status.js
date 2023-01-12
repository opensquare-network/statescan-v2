import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: #ffffff;
  border-radius: 4px;
  ${(p) =>
    css`
      background-color: ${p.bg};
    `};
`;

export default function Status({ status }) {
  if (!status) {
    return null;
  }
  let bg = `#3765DC`;
  switch (status) {
    case "Active":
      bg = `#52CC8A`;
      break;
    case "Frozen":
      break;
    case "Destroyed":
      bg = `#EE4444`;
      break;
    default:
      break;
  }
  if (status === "Active") {
    return null;
  }
  return <Wrapper bg={bg}>{status}</Wrapper>;
}
