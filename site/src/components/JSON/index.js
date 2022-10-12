import ReactJson from "react-json-view";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid ${(p) => p.theme.strokeBox};
  background: ${(p) => p.theme.fillPanel};
  .react-json-view {
    background: ${(p) => p.theme.fillPanel} !important;
  }
  span[style*="color: rgb(26, 25, 26)"] {
    color: ${(p) => p.theme.fontPrimary} !important;
  }

  padding: 16px;
  overflow-x: auto;
`;

export default function JsonView({ src }) {
  return (
    <Wrapper>
      <ReactJson
        src={src}
        theme="bright:inverted"
        iconStyle="circle"
        enableClipboard={false}
        collapseStringsAfterLength={false}
        displayDataTypes={false}
        name={false}
      />
    </Wrapper>
  );
}
