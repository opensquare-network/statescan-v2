import styled from "styled-components";
import { withLoading } from "../../../HOC/withLoading";
import { smcss } from "../../../styles/responsive";
import {
  flex,
  flex_1,
  items_center,
  justify_between,
  m,
  p,
  p_x,
  theme,
  w_full,
  max_w_half,
  gap_x,
  hidden,
  h,
  p_b,
} from "../../../styles/tailwindcss";
import NoData from "../../noData";

const List = styled.ul`
  ${m(0)};
  ${p(0)};
  ${p_b(8)};
  border-bottom: 1px solid ${theme("strokeBase")};
`;

const ListItemLeft = styled.div`
  ${flex};
  ${flex_1};
  ${max_w_half};
  ${gap_x(16)};
`;
const ListItemRight = styled.div`
  ${flex_1};
  ${max_w_half};
`;
const ListItemIcon = styled.div`
  ${smcss(hidden)};
`;

const ListItem = styled.li`
  ${p_x(24)};
  ${w_full};
  ${flex};
  ${items_center};
  ${justify_between};
  ${h(72)};
  box-sizing: border-box;
  &:not(:last-child) {
    border-bottom: 1px solid ${theme("strokeBase")};
  }
`;

function mapLoadingState(props) {
  const { loading } = props ?? {};
  return {
    loadingStates: loading,
  };
}

function LatestList({ items = [], loading = false, noDataText = "No Data" }) {
  if (!items.length && !loading) {
    return <NoData text={noDataText} />;
  }

  return (
    <div>
      <List>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemLeft>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {item.left}
            </ListItemLeft>
            <ListItemRight>{item.right}</ListItemRight>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default withLoading(mapLoadingState)(LatestList);
