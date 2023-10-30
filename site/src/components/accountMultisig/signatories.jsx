import AddressOrIdentity from "../address";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Table from "../table";

export default function AccountTabMultisigSignatories({ signatories = [] }) {
  const tableData = signatories.map((address) => {
    return [<AddressOrIdentity address={address} />];
  });

  return (
    <StyledPanelTableWrapperNoBordered>
      <Table heads={[{ name: "Signatories" }]} data={tableData} />
    </StyledPanelTableWrapperNoBordered>
  );
}
