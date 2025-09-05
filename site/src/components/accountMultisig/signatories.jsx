import { useMemo } from "react";
import AddressOrIdentity from "../address";
import { Flex } from "../styled/flex";
import { StyledPanelTableWrapperNoBordered } from "../styled/panel";
import Table from "../table";
import { sortAddresses } from "@polkadot/util-crypto";
import { getChainSettings } from "../../utils/chain";

export default function AccountTabMultisigSignatories({ signatories = [] }) {
  const { ss58Format } = getChainSettings();

  const sortedSignatories = useMemo(() => {
    return sortAddresses(signatories, ss58Format);
  }, [signatories, ss58Format]);

  const tableData = sortedSignatories.map((address) => {
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
