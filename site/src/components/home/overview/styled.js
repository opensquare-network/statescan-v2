import styled from "styled-components";
import { mobilecss, lgcss, smcss } from "../../../styles/responsive";
import { Flex } from "../../styled/flex";
import { block, gap_x, gap_y, grid_cols } from "../../../styles/tailwindcss";

export const OverviewPanel = styled(Flex)`
  margin: 24px;
  justify-content: space-between;

  ${mobilecss(block)}
`;

export const OverviewItemsWrapper = styled.div`
  flex: 1;
  display: grid;
  flex-wrap: wrap;
  ${gap_x(72)};
  ${gap_y(24)};
  ${grid_cols(4)};

  ${lgcss(grid_cols(3))}

  ${smcss(grid_cols(2))}
`;
