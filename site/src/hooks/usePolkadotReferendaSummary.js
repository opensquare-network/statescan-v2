import { useEffect, useState } from "react";
import api from "../services/api";
import { subSquareOpenGovReferendaSummaryApi } from "../services/urls";
import useChain from "../utils/hooks/chain/useChain";

export default function usePolkadotReferendaSummary() {
  const chain = useChain();
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chain) return;

    setLoading(true);

    api
      .fetch(subSquareOpenGovReferendaSummaryApi(chain))
      .then(({ result }) => {
        if (result) {
          setSummary(result);
        }
      })
      .catch((err) => {
        throw new Error("Fetch polkadot referenda summary failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chain]);

  return { summary, loading };
}
