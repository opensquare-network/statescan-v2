import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { usePageInfo } from "../../detail/table";
import { GET_FOREIGN_ACCOUNT_ASSET } from "../../../services/gql/foreignAssets";

const ForeignAssetsContext = createContext();

export function AccountForeignAssetsProvider({ children, address }) {
  const [foreignAssetsCount, setForeignAssetsCount] = useState();
  const [foreignAssetsData, setForeignAssetsData] = useState(null);
  const { page, pageSize } = usePageInfo();

  const { loading } = useQuery(GET_FOREIGN_ACCOUNT_ASSET, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address,
    },
    onCompleted: ({ accountForeignAssets: { holders, total } }) => {
      const result = {
        items: holders,
        total,
      };
      setForeignAssetsData(result);
      setForeignAssetsCount(total);
    },
  });

  return (
    <ForeignAssetsContext.Provider
      value={{
        foreignAssetsCount,
        foreignAssetsData,
        loading,
      }}
    >
      {children}
    </ForeignAssetsContext.Provider>
  );
}

export function useAccountForeignAssets() {
  const context = useContext(ForeignAssetsContext);
  return context;
}
