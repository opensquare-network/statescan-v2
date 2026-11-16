import styled from "styled-components";
import { withCopy } from "../../HOC/withCopy";
import EvmAddress, { useEnsProfile } from "./evmAddress";
import { Overpass_Mono_14_500 } from "../../styles/text";
import { normalizeEvmAddress } from "../../utils/normalizeAddress";
import { getEtherscanAddressUrl } from "../../utils/viewFuncs/lido";

const EnsAddressWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: border-box;
  height: 72px;
`;

const FullAddressLine = styled.div`
  ${Overpass_Mono_14_500};
  color: ${(p) => p.theme.theme500};
  max-width: 100%;
  word-break: break-all;
  transform: translateY(2px);
`;

const FullAddressLineWithCopy = withCopy(FullAddressLine);

export default function LidoAddressDetailAddress({ address }) {
  const normalizedAddress = normalizeEvmAddress(address);
  const ensProfile = useEnsProfile(normalizedAddress);
  const { name: ensName } = ensProfile;

  if (!ensName) {
    return (
      <EvmAddress address={address} href={getEtherscanAddressUrl(address)} />
    );
  }

  return (
    <EnsAddressWrapper>
      <EvmAddress
        address={address}
        href={getEtherscanAddressUrl(address)}
        copy={false}
      />
      <FullAddressLineWithCopy copyContent={normalizedAddress}>
        {normalizedAddress}
      </FullAddressLineWithCopy>
    </EnsAddressWrapper>
  );
}
