import { Fragment } from "react";
import styled from "styled-components";
import { Tag, TagThemed } from "../tag";
import { Flex, FlexColumn } from "../styled/flex";
import { TextSecondary } from "../styled/text";
import { Overpass_Mono_14_500 } from "../../styles/text";
import { hexEllipsis } from "../../utils";
import { formatEvmArgValue } from "../../utils/revive";

const Mono = styled.span`
  ${Overpass_Mono_14_500};
  word-break: break-all;
`;

const ArgsGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 12px;
  align-items: baseline;
`;

export default function ExtrinsicEvmCall({ calldata }) {
  if (!calldata) {
    return null;
  }

  const { selector, functionName, signature, inputs, args, data } = calldata;

  if (!selector) {
    return <TextSecondary>0x</TextSecondary>;
  }

  if (!functionName) {
    return (
      <FlexColumn gap={4}>
        <Flex gap={8}>
          <Tag>Unknown</Tag>
          <Mono>{selector}</Mono>
        </Flex>
        <TextSecondary>{hexEllipsis(data, 14, 10)}</TextSecondary>
      </FlexColumn>
    );
  }

  return (
    <FlexColumn gap={8} style={{ width: "100%" }}>
      <Flex gap={4} style={{ flexWrap: "wrap" }}>
        <TagThemed>{functionName}</TagThemed>
        <Mono>{signature.slice(functionName.length)}</Mono>
      </Flex>

      {inputs.length > 0 && (
        <ArgsGrid>
          {inputs.map((input, index) => (
            <Fragment key={index}>
              <TextSecondary>{input.name || `arg${index}`}</TextSecondary>
              <Mono>
                {formatEvmArgValue(args[index], input.type, input.components)}
              </Mono>
            </Fragment>
          ))}
        </ArgsGrid>
      )}
    </FlexColumn>
  );
}
