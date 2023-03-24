import { useEffect, useState } from "react";
import { achainableProfileApi } from "../services/urls";
import api from "../services/api";

export default function useAchainableProfile(address) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    api.fetch(achainableProfileApi(address)).then(({ result }) => {
      if (result) {
        setProfile(result);
      }
    });
  }, [address]);

  return profile;
}
