import InnerTable from "./nestedTable/innerTable";
import { decodeEvmCalldata, getEvmCallTableData } from "../../utils/revive";

// The table expanded under a revive call row: the method signature and, in a
// nested table, the key-value pairs of its parameters.
export default function ContractCallParams({ call }) {
  const calldata = decodeEvmCalldata(call?.data, call?.dest);

  return <InnerTable data={getEvmCallTableData(calldata)} />;
}
