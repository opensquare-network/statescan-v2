import { withLoadingTbody } from "../../../HOC/withLoading";
import TableLoading from "../../loadings/tableLoading";
import TableEmpty from "./empty";
import TableRow from "./row";

const mapLoadingState = (props) => {
  const { data, loading } = props;
  return {
    loadingStates: [data === null, loading],
    loadingComponent: <TableLoading />,
  };
};

function TableBody({ heads, data = null }) {
  if (!data?.length) {
    return <TableEmpty />;
  }

  return (
    <tbody>
      {data.map((row, index) => {
        return <TableRow heads={heads} row={row} key={index} />;
      })}
    </tbody>
  );
}

export default withLoadingTbody(mapLoadingState)(TableBody);
