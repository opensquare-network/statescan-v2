import { withLoading } from "../../../HOC/withLoading";
import TableLoading from "../../loadings/tableLoading";
import TableRow from "./row";

const mapLoadingState = (props) => {
  const { data } = props;
  return {
    loadingStates: [data === null],
    loadingComponent: <TableLoading />,
  };
};

function TableBody({ heads, data = null }) {
  if (data === null) {
    return null;
  }

  return (
    <tbody>
      {data.map((row, index) => {
        return <TableRow heads={heads} row={row} key={index} />;
      })}
    </tbody>
  );
}

export default withLoading(mapLoadingState)(TableBody);
