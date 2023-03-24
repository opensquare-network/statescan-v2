import { useEffect, useState } from "react";
import { achainableProfileApi } from "../services/urls";
import api from "../services/api";

export default function useAchainableProfile(address) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    api
      .fetch(`http://127.0.0.1:5010${achainableProfileApi(address)}`)
      .then(({ result }) => {
        if (result) {
          setProfile(result);
        }
      });
  }, [address]);

  return profile;
}
