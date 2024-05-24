import styled from "styled-components";
import { Panel } from "../styled/panel";
import { Inter_12_600, Inter_14_600 } from "../../styles/text";
import { Flex, FlexBetween } from "../styled/flex";
import {
  bg_theme500,
  p_x,
  p_y,
  rounded_4,
  w_full,
} from "../../styles/tailwindcss";
import { Button, PanelButton } from "../styled/buttons";

export const ForSmallScreen = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

export const Wrapper = styled(Panel)`
  margin-bottom: 16px;
  padding: 28px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  overflow: visible;
  ${Inter_14_600};
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h2`
  all: unset;
  white-space: nowrap;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;
  ${Inter_12_600};
`;

export const HeadWrapper = styled(FlexBetween)`
  flex-grow: 1;
  flex-basis: 100%;
`;

export const FilterButton = styled(Button)`
  ${p_y(4)};
  ${p_x(12)};
  ${(p) => p.dark && bg_theme500};
  ${rounded_4};

  @media screen and (max-width: 900px) {
    ${w_full};
    ${p_x(0)};
  }
`;
export const ResetButton = styled(PanelButton)`
  padding: 3px 11px;
  border-radius: 4px;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
  @media screen and (min-width: 900px) {
    flex-direction: row;
  }
  width: 100%;
  gap: 24px;
`;

export const FilterForm = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (min-width: 900px) {
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 24px;
  }
`;

export const FilterActions = styled(Flex)`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: end;
  column-gap: 10px;
`;
