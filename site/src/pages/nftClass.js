import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import Panel from "../components/nft/classDetail/panel";
import {
  fetchNftClassDetail,
  nftClassDetailSelector,
  resetNftClassDetail,
} from "../store/reducers/nftClassSlice";

export default function NftClass() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(nftClassDetailSelector);

  useEffect(() => {
    if (classId) {
      dispatch(fetchNftClassDetail(classId));
    }

    return () => {
      dispatch(resetNftClassDetail());
    };
  }, [dispatch, classId]);

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "NFT", path: "/nfts" },
            { name: "Class" },
            { name: classId },
          ]}
        />
      }
    >
      <Panel nftClass={detail} />
    </DetailLayout>
  );
}
