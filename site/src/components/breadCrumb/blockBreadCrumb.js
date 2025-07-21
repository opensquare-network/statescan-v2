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
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.strokeBoxSelected};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      border-color: transparent;
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }

  svg path {
    stroke: ${({ theme }) => theme.fontSecondary};
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
    if (height > 0) {
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
        disabled={height < 1}
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
