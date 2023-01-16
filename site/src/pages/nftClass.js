import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailTable from "../components/detail/table";
import DetailTabs from "../components/detail/tabs";
import DetailLayout from "../components/layout/detailLayout";
import Panel from "../components/nft/classDetail/panel";
import { NftInstancePreview } from "../components/nft/preview";
import { detailTablesSelector } from "../store/reducers/detailTablesSlice";
import {
  fetchNftClassDetail,
  nftClassDetailSelector,
  clearNftClassDetail,
} from "../store/reducers/nftClassSlice";
import { Instances, nftClassInstanceHead } from "../utils/constants";
import { toInstancesTabTableItem } from "../utils/viewFuncs/toTableItem";

export default function NftClass() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(nftClassDetailSelector);
  const tablesData = useSelector(detailTablesSelector);
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  useEffect(() => {
    if (classId) {
      dispatch(fetchNftClassDetail(classId));
    }

    return () => {
      dispatch(clearNftClassDetail());
    };
  }, [dispatch, classId]);

  const instancesApiKey =
    detail &&
    `/uniques/class/${detail?.classId}_${detail?.classHeight}/instances`;

  const tabs = [
    {
      name: Instances,
      count: tablesData?.[instancesApiKey]?.total,
      children: (
        <DetailTable
          url={instancesApiKey}
          heads={nftClassInstanceHead}
          transformData={(instances) =>
            toInstancesTabTableItem(detail, instances, showPreview)
          }
        />
      ),
    },
  ];

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
      <DetailTabs tabs={tabs} />
      <NftInstancePreview
        open={isPreview}
        nftClass={detail}
        nftInstance={previewNft}
        onClose={() => setIsPreview(false)}
      />
    </DetailLayout>
  );
}
