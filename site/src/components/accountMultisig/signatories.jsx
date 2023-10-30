import AddressOrIdentity from "../address";
import { Flex } from "../styled/flex";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Table from "../table";

export default function AccountTabMultisigSignatories({ signatories = [] }) {
  const tableData = signatories.map((address) => {
    return [
      <Flex>
        <AddressOrIdentity address={address} />
      </Flex>,
    ];
  });

  return (
    <StyledPanelTableWrapperNoBordered>
      <Table heads={[{ name: "Signatories" }]} data={tableData} />
    </StyledPanelTableWrapperNoBordered>
  );
}
