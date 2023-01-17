import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nftListLoadingSelector } from "../../../store/reducers/nftSlice";
import Table from "../../table";

const page = 0;
const pageSize = 5;

export default function Nfts() {
  const dispatch = useDispatch();
  const loading = useSelector(nftListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return <Table loading={loading} />;
}
