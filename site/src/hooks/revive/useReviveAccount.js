import { useEffect, useState } from "react";
import { encodeAddress } from "@polkadot/util-crypto";
import { useChainApi } from "../../utils/hooks/chain/useChainApi";
import { getChainSettings } from "../../utils/chain";
import { normalizeEvmAddress } from "../../utils/reviveAddress";
import { reviveEvmToSubstrateAddress } from "../../utils/reviveSubstrateAddress";

// Give up waiting for the chain client after this delay and fall back to the
// account derived from the EVM address.
const RESOLVE_TIMEOUT = 10 * 1000;

function parseAccountType(info) {
  const accountType = info?.accountType;
  if (!accountType) {
    return null;
  }

  if (accountType.type === "EOA") {
    return { type: "eoa" };
  }

  if (accountType.type === "Contract") {
    return {
      type: "contract",
      codeHash: accountType.value?.toString?.() ?? null,
    };
  }

  return null;
}

// Resolves the substrate account an EVM address belongs to: the account that
// registered the pallet-revive mapping, or the account derived from the address.
// Also reads whether the address is an externally owned account or a contract.
export default function useReviveAccount(evmAddress) {
  const api = useChainApi();
  const { ss58Format } = getChainSettings();
  const normalizedAddress = normalizeEvmAddress(evmAddress);
  const [state, setState] = useState({
    substrateAddress: null,
    isMapped: false,
    accountType: null,
    isResolved: false,
  });

  useEffect(() => {
    const derivedAddress = normalizedAddress
      ? reviveEvmToSubstrateAddress(normalizedAddress, ss58Format)
      : null;

    setState({
      substrateAddress: derivedAddress,
      isMapped: false,
      accountType: null,
      isResolved: !normalizedAddress,
    });

    if (!normalizedAddress) {
      return;
    }

    const timer = setTimeout(() => {
      setState((prev) =>
        prev.isResolved ? prev : { ...prev, isResolved: true },
      );
    }, RESOLVE_TIMEOUT);

    return () => clearTimeout(timer);
  }, [normalizedAddress, ss58Format]);

  useEffect(() => {
    if (!api || !normalizedAddress) {
      return;
    }

    let mounted = true;
    let unsubscribeOriginalAccount = null;
    let unsubscribeAccountInfo = null;

    const subscribeOriginalAccount = async () => {
      try {
        const unsubscribe = await api.query.revive.originalAccount(
          normalizedAddress,
          (result) => {
            if (!mounted) {
              return;
            }

            const mapped = result?.unwrapOr?.(null) ?? null;
            const substrateAddress = mapped
              ? encodeAddress(mapped.toU8a?.() ?? mapped, ss58Format)
              : reviveEvmToSubstrateAddress(normalizedAddress, ss58Format);

            setState((prev) => ({
              ...prev,
              substrateAddress,
              isMapped: !!mapped,
              isResolved: true,
            }));
          },
        );

        if (!mounted) {
          unsubscribe?.();
          return;
        }

        unsubscribeOriginalAccount = unsubscribe;
      } catch {
        // The derived address is used after the timeout.
      }
    };

    const subscribeAccountInfo = async () => {
      try {
        const unsubscribe = await api.query.revive.accountInfoOf(
          normalizedAddress,
          (result) => {
            if (!mounted) {
              return;
            }

            setState((prev) => ({
              ...prev,
              accountType: parseAccountType(result?.unwrapOr?.(null) ?? null),
            }));
          },
        );

        if (!mounted) {
          unsubscribe?.();
          return;
        }

        unsubscribeAccountInfo = unsubscribe;
      } catch {
        // The account page still renders without the account type.
      }
    };

    subscribeOriginalAccount();
    subscribeAccountInfo();

    return () => {
      mounted = false;
      unsubscribeOriginalAccount?.();
      unsubscribeAccountInfo?.();
    };
  }, [api, normalizedAddress, ss58Format]);

  return state;
}
