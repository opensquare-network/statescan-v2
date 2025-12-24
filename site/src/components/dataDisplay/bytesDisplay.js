import { useState } from "react";
import styled from "styled-components";
import { isHex } from "@polkadot/util";
import { hexIsValidUTF8 } from "../../utils/utf8validate";
import { Inter_12_600 } from "../../styles/text";
import maybeHexToUft8 from "../../utils/hex";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  word-break: break-all;
`;

const ToggleButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  ${Inter_12_600};
  color: ${({ theme }) => theme.fontSecondary};
  background: ${({ theme }) => theme.fillSub};
  width: fit-content;
  height: 20px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.theme500};
    background: ${({ theme }) => theme.theme100};
  }
`;

export default function BytesDisplay({ value }) {
  const canConvert = isHex(value) && hexIsValidUTF8(value);
  const [isDecoded, setIsDecoded] = useState(canConvert);
  if (!canConvert) {
    return <ContentWrapper>{value}</ContentWrapper>;
  }

  return (
    <Wrapper>
      <ContentWrapper>
        {isDecoded ? maybeHexToUft8(value) : value}
      </ContentWrapper>
      <ToggleButton onClick={() => setIsDecoded(!isDecoded)}>
        {isDecoded ? "Encode" : "Decode"}
      </ToggleButton>
    </Wrapper>
  );
}
