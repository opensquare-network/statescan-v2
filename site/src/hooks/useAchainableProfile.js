import { useEffect, useState } from "react";
import { achainableProfileApi } from "../services/urls";
import api from "../services/api";
import useChain from "../utils/hooks/chain/useChain";
import { Chains } from "@osn/constants";

export default function useAchainableProfile(address) {
  const [profile, setProfile] = useState(null);
  const chain = useChain();

  useEffect(() => {
    if (chain !== Chains.kusama) {
      return;
    }

    api.fetch(achainableProfileApi(address)).then(({ result }) => {
      if (result) {
        setProfile(result);
      }
    });
  }, [chain, address]);

  return profile;
}
