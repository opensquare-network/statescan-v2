import { createContext, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Inter_12_600, Overpass_Mono_14_400 } from "../../styles/text";
import {
  decodeEvmCalldata,
  formatEvmArgValue,
  parseEvmTransaction,
} from "../../utils/revive";
import { useVerifiedContractsVersion } from "../../context/verifiedContracts";
import ExtrinsicEvmCall from "./evmCall";
import ContractLabel from "./contractLabel";
import { Tag } from "../tag";
import { Flex, FlexColumn } from "../styled/flex";
import { TextSecondary } from "../styled/text";
import { hexEllipsis } from "../../utils";

const DECODE = "decode";
const RAW = "raw";

const noop = () => {};

const ReviveCallFormatContext = createContext({
  getFormat: () => DECODE,
  setFormat: noop,
});

/**
 * Holds the Decode/Raw choice of every calldata rendered in one parameters
 * table. The raw calldata is the key, so each revive call keeps its own choice.
 */
export function ReviveCallFormatProvider({ children }) {
  const [formats, setFormats] = useState({});

  const value = useMemo(
    () => ({
      getFormat: (key) => formats[key] ?? DECODE,
      setFormat: (key, format) =>
        setFormats((prev) => ({ ...prev, [key]: format })),
    }),
    [formats],
  );

  return (
    <ReviveCallFormatContext.Provider value={value}>
      {children}
    </ReviveCallFormatContext.Provider>
  );
}

const FieldName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Toggle = styled.button`
  all: unset;
  padding: 0 4px;
  border-radius: 4px;
  ${Inter_12_600};
  font-size: 10px;
  color: ${({ theme }) => theme.fontSecondary};
  background: ${({ theme }) => theme.fillSub};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.theme500};
    background: ${({ theme }) => theme.theme100};
  }
`;

const RawData = styled.span`
  ${Overpass_Mono_14_400};
  word-break: break-all;
`;

const DecodedContent = styled.div`
  padding: 10px 0;
`;

export function ReviveDataFieldName({ value, label = "data" }) {
  const { getFormat, setFormat } = useContext(ReviveCallFormatContext);
  const next = getFormat(value) === DECODE ? RAW : DECODE;

  return (
    <FieldName>
      <span>{label}</span>
      <Toggle
        title={next === RAW ? "Show raw data" : "Show decoded data"}
        onClick={() => setFormat(value, next)}
      >
        {next === RAW ? "Raw" : "Decode"}
      </Toggle>
    </FieldName>
  );
}

export function ReviveCallData({ value, dest }) {
  const { getFormat } = useContext(ReviveCallFormatContext);
  const verifiedContractsVersion = useVerifiedContractsVersion();
  const calldata = useMemo(
    () => decodeEvmCalldata(value, dest),
    // Decode again once the verified contracts are loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, dest, verifiedContractsVersion],
  );

  if (getFormat(value) === RAW) {
    return <RawData>{value}</RawData>;
  }

  return (
    <DecodedContent>
      <ExtrinsicEvmCall calldata={calldata} />
    </DecodedContent>
  );
}

/**
 * The ethereum transaction a `revive.ethTransact` payload carries: the contract
 * it reaches and the call it makes there.
 */
export function ReviveEthTransactData({ value }) {
  const { getFormat } = useContext(ReviveCallFormatContext);
  const verifiedContractsVersion = useVerifiedContractsVersion();

  const transaction = useMemo(
    () => parseEvmTransaction(value),
    // Decode again once the verified contracts are loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, verifiedContractsVersion],
  );

  if (getFormat(value) === RAW) {
    return <RawData>{value}</RawData>;
  }

  if (!transaction) {
    return <TextSecondary>{hexEllipsis(value, 14, 10)}</TextSecondary>;
  }

  const { to, value: transactionValue, data } = transaction;

  return (
    <DecodedContent>
      <FlexColumn gap={8} style={{ width: "100%" }}>
        <Flex gap={8} style={{ flexWrap: "wrap" }}>
          <TextSecondary>to</TextSecondary>
          {to ? <ContractLabel address={to} /> : <Tag>Contract creation</Tag>}
        </Flex>
        {transactionValue > 0n && (
          <Flex gap={8} style={{ flexWrap: "wrap" }}>
            <TextSecondary>value</TextSecondary>
            <RawData>{formatEvmArgValue(transactionValue, "uint256")}</RawData>
          </Flex>
        )}
        {to && <ExtrinsicEvmCall calldata={decodeEvmCalldata(data, to)} />}
      </FlexColumn>
    </DecodedContent>
  );
}
