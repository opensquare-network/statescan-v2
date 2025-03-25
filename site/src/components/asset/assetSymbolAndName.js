import React from "react";
import styled, { css } from "styled-components";
import { Inter_14_500 } from "../../styles/text";
import { Flex } from "../styled/flex";
import Symbol from "../symbol";
import SymbolName from "../symbol/name";

const AssetNameWrapper = styled.div`
  ${Inter_14_500};
  color: var(--fontSecondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const AssetSymbolWrapper = styled.div`
  width: 120px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const symbolStyle = css`
  width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

/**
 * @param {Object} asset
 * @param {Object} symbolStyle
 * @param {string} nameWidth
 * @returns {JSX.Element}
 */
const AssetSymbolAndName = ({ asset, nameWidth = "384px" }) => {
  const { metadata } = asset || {};

  return (
    <Flex>
      <AssetSymbolWrapper>
        {metadata?.symbol ? <Symbol asset={asset} style={symbolStyle} /> : "--"}
      </AssetSymbolWrapper>

      <AssetNameWrapper>
        {metadata?.name ? (
          <SymbolName
            name={metadata.name}
            color="var(--fontSecondary)"
            width={nameWidth}
          />
        ) : (
          "--"
        )}
      </AssetNameWrapper>
    </Flex>
  );
};

export default AssetSymbolAndName;
