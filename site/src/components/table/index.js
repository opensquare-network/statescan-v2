import styled from "styled-components";
import TableHead from "./head";
import TableBody from "./body";
import { withBlockLoading } from "../../HOC/withLoading";

const StyledTable = styled.table`
  margin-top: 8px;
  position: relative;
  width: 100%;
  table-layout: fixed;
  background: ${(p) => p.theme.fillPanel};
  border-collapse: collapse;
  color: ${(p) => p.theme.fontPrimary};
`;

const mapLoadingState = (props) => {
  const { data, loading } = props;
  return {
    loadingStates: [data === null, loading],
  };
};

function Table({ heads = [], data = null }) {
  return (
    <StyledTable>
      <TableHead heads={heads} />
      <TableBody heads={heads} data={data} />
    </StyledTable>
  );
}

export default withBlockLoading(mapLoadingState)(Table);
