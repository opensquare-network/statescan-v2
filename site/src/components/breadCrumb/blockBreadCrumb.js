import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Flex } from "../styled/flex";
import { Inter_20_700 } from "../../styles/text";
import CaretLeftIcon from "../icons/caretLeftIcon";
import CaretRightIcon from "../icons/caretRightIcon";
import { currencify } from "../../utils";

const BlockBreadCrumbWrapper = styled(Flex)`
  margin-bottom: 16px;
  height: 36px;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
`;

const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${(p) => p.theme.strokeBase};
  border-radius: 4px;
  background: ${(p) => p.theme.theme500};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  svg path {
    stroke: ${(p) => p.theme.fillBase};
  }
`;

const BlockTitle = styled.div`
  ${Inter_20_700};
  color: ${(p) => p.theme.fontPrimary};
  min-width: 120px;
  text-align: center;
`;

export default function BlockBreadCrumb({ height }) {
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (height > 1) {
      navigate(`/blocks/${height - 1}`);
    }
  };

  const handleNext = () => {
    navigate(`/blocks/${height + 1}`);
  };

  return (
    <BlockBreadCrumbWrapper>
      <NavigationButton
        onClick={handlePrevious}
        disabled={height <= 1}
        title="Previous Block"
      >
        <CaretLeftIcon />
      </NavigationButton>

      <BlockTitle>Block #{currencify(height) ?? "..."}</BlockTitle>

      <NavigationButton onClick={handleNext} title="Next Block">
        <CaretRightIcon />
      </NavigationButton>
    </BlockBreadCrumbWrapper>
  );
}
