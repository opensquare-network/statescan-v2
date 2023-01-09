import styled, { css } from "styled-components";
import { FlexColumn } from "../../styled/flex";
import TimelineItemIcon from "./itemIcon";
import TimelineItemInfo from "./itemInfo";

const Wrapper = styled.div`
  display: flex;
  padding: 0 24px;
`;

const NavigationLine = styled(FlexColumn)`
  align-items: center;
  margin-right: 16px;
`;

const TopLine = styled.div`
  width: 2px;
  height: 20px;
  margin-bottom: 4px;
  ${(p) =>
    !p.isFirst &&
    css`
      background-color: ${(p) => p.theme.strokeBox};
    `}
`;

const BottomLine = styled.div`
  width: 2px;
  margin-top: 4px;
  flex-grow: 1;
  ${(p) =>
    !p.isLast &&
    css`
      background-color: ${(p) => p.theme.strokeBox};
    `}
`;

const InfoPanel = styled(FlexColumn)``;

const TopSpace = styled.div`
  height: 18px;
`;

export default function TimelineItem({ asset, item, isFirst, isLast }) {
  return (
    <Wrapper>
      <NavigationLine>
        <TopLine isFirst={isFirst} />
        <TimelineItemIcon name={item?.name} />
        <BottomLine isLast={isLast} />
      </NavigationLine>
      <InfoPanel>
        <TopSpace />
        <TimelineItemInfo asset={asset} item={item} />
      </InfoPanel>
    </Wrapper>
  );
}
