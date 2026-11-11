import { useMemo, useState } from "react";
import styled from "styled-components";
import Dropdown from "../dropdown";
import { Panel } from "../styled/panel";
import {
  Inter_12_400,
  Inter_14_600,
  Overpass_Mono_12_400,
} from "../../styles/text";

const CodePanel = styled(Panel)`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  color: ${(p) => p.theme.fontPrimary};
`;

const Title = styled.div`
  ${Inter_14_600};
  color: ${(p) => p.theme.fontPrimary};
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  margin-bottom: 16px;
  ${Inter_12_400};
  color: ${(p) => p.theme.fontSecondary};
`;

const MetaItem = styled.div`
  display: flex;
  gap: 6px;
`;

const MetaLabel = styled.span`
  color: ${(p) => p.theme.fontTertiary};
`;

const CodeWrapper = styled.div`
  max-height: 70vh;
  overflow: auto;
  border: 1px solid ${(p) => p.theme.strokeBase};
  border-radius: 8px;
  background: ${(p) => p.theme.fillSub};
`;

const Code = styled.pre`
  margin: 0;
  padding: 16px;
  ${Overpass_Mono_12_400};
  line-height: 1.6;
  color: ${(p) => p.theme.fontPrimary};
  white-space: pre;
  tab-size: 2;
`;

const FilePath = styled.div`
  ${Overpass_Mono_12_400};
  color: ${(p) => p.theme.fontSecondary};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Empty = styled.div`
  padding: 24px;
  ${Inter_12_400};
  color: ${(p) => p.theme.fontSecondary};
`;

function buildSourceFiles(contract) {
  const files = [];
  const seen = new Set();

  const add = (filePath, sourceCode) => {
    if (!filePath && !sourceCode) {
      return;
    }

    const key = filePath || `source-${files.length}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    files.push({
      filePath: filePath || "Source",
      sourceCode: sourceCode || "",
    });
  };

  add(contract.filePath, contract.sourceCode);
  for (const source of contract.additionalSources || []) {
    add(source?.filePath, source?.sourceCode);
  }

  return files;
}

function optimizationText(contract) {
  if (
    contract.optimizationEnabled === null ||
    contract.optimizationEnabled === undefined
  ) {
    return "--";
  }

  return contract.optimizationEnabled
    ? `Enabled (${contract.optimizationRuns ?? "-"})`
    : "Disabled";
}

function verificationText(contract) {
  if (contract.isFullyVerified) {
    return "Full";
  }
  if (contract.isPartiallyVerified) {
    return "Partial";
  }

  return "--";
}

export default function ContractCode({ contract }) {
  const files = useMemo(() => buildSourceFiles(contract), [contract]);
  const [selected, setSelected] = useState(files[0]?.filePath || "");
  const selectedFile =
    files.find((file) => file.filePath === selected) ?? files[0];

  const options = files.map((file) => ({
    value: file.filePath,
    text: file.filePath,
  }));

  return (
    <CodePanel>
      <Header>
        <Title>Code</Title>
        {files.length > 1 ? (
          <Dropdown
            value={selected}
            options={options}
            name="sourceFile"
            onSelect={(_, value) => setSelected(value)}
            isSearch={files.length > 8}
            width={360}
            optionWidth={480}
          />
        ) : (
          selectedFile?.filePath && <FilePath>{selectedFile.filePath}</FilePath>
        )}
      </Header>

      <Meta>
        <MetaItem>
          <MetaLabel>Contract</MetaLabel>
          <span>{contract.name || "--"}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>Compiler</MetaLabel>
          <span>{contract.compilerVersion || "--"}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>EVM Version</MetaLabel>
          <span>{contract.evmVersion || "--"}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>Optimization</MetaLabel>
          <span>{optimizationText(contract)}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>License</MetaLabel>
          <span>{contract.licenseType || "--"}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>Verification</MetaLabel>
          <span>{verificationText(contract)}</span>
        </MetaItem>
        <MetaItem>
          <MetaLabel>Source Files</MetaLabel>
          <span>{files.length}</span>
        </MetaItem>
      </Meta>

      {selectedFile?.sourceCode ? (
        <CodeWrapper>
          <Code>{selectedFile.sourceCode}</Code>
        </CodeWrapper>
      ) : (
        <Empty>No source code available</Empty>
      )}
    </CodePanel>
  );
}
