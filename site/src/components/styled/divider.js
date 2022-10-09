import styled from "styled-components";

const Div = styled.div`
  background: ${(p) => p.theme.strokeBase};
  height: 1px;
`;

export default function Divider({ margin = 8 }) {
  return <Div style={{ marginTop: margin, marginBottom: margin }} />;
}
