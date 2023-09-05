import { useEffect, useState } from "react";
import useChainSettings from "../utils/hooks/chain/useChainSettings";
import { fetchIdentity } from "@osn/common";
import { gql, useLazyQuery } from "@apollo/client";
import { IDENTITY_ID_TYPE, IDENTITY_JUDGEMENT } from "../utils/constants";

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

        if (data.identity) {
          setIdentity(normalizeIdentity(data.identity));
        }
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
        account
        display
        fullDisplay
        judgements {
          judgement
        }
        parentInfo {
          display
          judgements {
            judgement
          }
        }
        isSub
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
  const info = normalizeIdentityInfo(identity);

  return {
    address: identity?.account,
    info,
  };
}

function normalizeIdentityInfo(identity) {
  if (!identity?.display && !identity?.parentInfo?.display) {
    return {
      status: IDENTITY_ID_TYPE.NO_ID,
    };
  }

  const judgements = identity?.isSub
    ? identity?.parentInfo?.judgements
    : identity?.judgements;

  const isAuthorized = judgements?.some?.(
    (j) =>
      j.judgement === IDENTITY_JUDGEMENT.Reasonable ||
      j.judgement === IDENTITY_JUDGEMENT.KnownGood,
  );
  const isBad = judgements?.some?.(
    (j) =>
      j.judgement === IDENTITY_JUDGEMENT.Erroneous ||
      j.judgement === IDENTITY_JUDGEMENT.LowQuality,
  );

  let status;
  if (identity?.isSub) {
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
    display: identity?.fullDisplay,
    status,
  };
}
