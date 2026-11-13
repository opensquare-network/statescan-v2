import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";

const AccountAddressContext = createContext(null);

export function AccountAddressProvider({ address, children }) {
  return (
    <AccountAddressContext.Provider value={address}>
      {children}
    </AccountAddressContext.Provider>
  );
}

// The account page can show a different account than the URL address, e.g. the
// substrate account an EVM address maps to.
export function useAccountAddress() {
  const { id } = useParams();
  return useContext(AccountAddressContext) || id;
}
