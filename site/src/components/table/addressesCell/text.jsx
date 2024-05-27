// a cell that displays a list of addresses when hovering
// used in miltisig approving cell, recoveries friends cell

import styled from "styled-components";
import Tooltip from "../../tooltip";
import AddressOrIdentity from "../../address";
import { Overpass_Mono_12_500 } from "../../../styles/text";

const TipWrapper = styled.div`
  * {
    color: var(--textPrimary);
    white-space: nowrap;
    ${Overpass_Mono_12_500}
  }
`;

export default function AddressesCellText({ addresses = [], title = "" }) {
  return (
    <Tooltip
      tip={
        !!addresses?.length && (
          <TipWrapper>
            <div>{title}:</div>
            {addresses?.map?.((address) => (
              <div key={address}>
                <AddressOrIdentity
                  key={address}
                  address={address}
                  ellipsis={false}
                />
              </div>
            ))}
          </TipWrapper>
        )
      }
    >
      {addresses?.length}
    </Tooltip>
  );
}
