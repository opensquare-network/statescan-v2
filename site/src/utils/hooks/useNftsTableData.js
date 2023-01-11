import React from "react";
import { useSelector } from "react-redux";
import { nftListSelector } from "../../store/reducers/nftSlice";

export function useNftsTableData() {
  const list = useSelector(nftListSelector);

  if (!list?.items) {
    return null;
  }

  return list?.items?.map((nft) => {
    return [];
  });
}
