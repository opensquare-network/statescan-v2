import { useEffect, useState } from "react";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import { fetchIdentity } from "@osn/common";
import { gql, useLazyQuery } from "@apollo/client";
import { IDENTITY_ID_TYPE } from "../utils/constants";

export function useIdentity(address = "") {
  const chainSettings = useChainSettings();
  const { modules } = chainSettings;
  const hasIdentity = modules?.identity;

  const [identity, setIdentity] = useState(null);
  const fetcher = useGqlFetcher(address);

  useEffect(() => {
    setIdentity(null);
    if (hasIdentity) {
      fetcher().then((resp) => {
        const { data } = resp;
        const normalizedIdentity = normalizeIdentity(data.identity);
        setIdentity(normalizedIdentity);
      });
    } else {
      fetchIdentity(chainSettings.identity, address).then((identity) => {
        setIdentity(identity);
      });
    }
  }, [address, hasIdentity, chainSettings.identity, fetcher]);

  return identity;
}

function useGqlFetcher(address = "") {
  const GET_IDENTITY = gql`
    query GetIdentity($account: String!) {
      identity(account: $account) {
        fullDisplay
        judgements {
          judgement
        }
        parentInfo {
          judgements {
            judgement
          }
        }
        isSub
        account
      }
    }
  `;

  const [fetcher] = useLazyQuery(GET_IDENTITY, {
    variables: { account: address },
  });

  return fetcher;
}

// osn/common fetchIdentity result
function normalizeIdentity(identity) {
  const judgements = identity?.isSub
    ? identity?.parentInfo?.judgements
    : identity?.judgements;

  const isAuthorized = judgements?.some?.(
    (j) => j.judgement === "Reasonable" || j.judgement === "KnownGood",
  );
  const isBad = judgements?.some?.(
    (j) => j.judgement === "Erroneous" || j.judgement === "LowQuality",
  );

  let status;
  if (identity?.parentInfo?.judgements) {
    if (isAuthorized) {
      status = IDENTITY_ID_TYPE.VERIFIED_LINKED;
    } else if (isBad) {
      status = IDENTITY_ID_TYPE.ERRONEOUS_LINKED;
    } else {
      status = IDENTITY_ID_TYPE.NOT_VERIFIED_LINKED;
    }
  } else {
    if (isAuthorized) {
      status = IDENTITY_ID_TYPE.VERIFIED;
    } else if (isBad) {
      status = IDENTITY_ID_TYPE.ERRONEOUS;
    } else {
      status = IDENTITY_ID_TYPE.NOT_VERIFIED;
    }
  }

  return {
    address: identity?.account,
    info: {
      display: identity?.fullDisplay,
      status,
    },
  };
}
