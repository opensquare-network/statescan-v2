import { runtimePalletsHead } from "../../../utils/constants";
import { toRuntimePalletsTabTableItem } from "../../../utils/viewFuncs/toTableItem";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Table from "../../table";

export default function RuntimePalletsTable({ pallets = [] }) {
  const data = pallets?.map(toRuntimePalletsTabTableItem);

  return (
    <StyledPanelTableWrapper>
      <Table heads={runtimePalletsHead} data={data} />
    </StyledPanelTableWrapper>
  );
}
