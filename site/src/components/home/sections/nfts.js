import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nftFetchList,
  nftListLoadingSelector,
} from "../../../store/reducers/nftSlice";
import { nftsHead } from "../../../utils/constants";
import { useNftsTableData } from "../../../utils/hooks/useNftsTableData";
import { NftClassPreview } from "../../nft/preview";
import Table from "../../table";

const page = 0;
const pageSize = 5;

export default function Nfts() {
  const dispatch = useDispatch();
  const loading = useSelector(nftListLoadingSelector);
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  const data = useNftsTableData({ showPreview });

  useEffect(() => {
    const controller = new AbortController();

    // TODO: need params
    dispatch(nftFetchList(page, pageSize, {}, { signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Table heads={nftsHead} data={data} loading={loading} />
      <NftClassPreview
        open={isPreview}
        nftClass={previewNft}
        onClose={() => setIsPreview(false)}
      />
    </>
  );
}
