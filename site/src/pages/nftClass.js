import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailTable from "../components/detail/table";
import DetailTabs from "../components/detail/tabs";
import DetailLayout from "../components/layout/detailLayout";
import Panel from "../components/nft/detail/classInfoPanel";
import { NftInstancePreview } from "../components/nft/preview";
import NftClassTimeline from "../components/nft/detail/classTimeline";
import {
  fetchNftClassDetail,
  nftClassDetailSelector,
  clearNftClassDetail,
} from "../store/reducers/nftClassSlice";
import {
  Attributes,
  Instances,
  nftClassInstanceHead,
  Timeline,
} from "../utils/constants";
import { toInstancesTabTableItem } from "../utils/viewFuncs/toTableItem";
import DetailTableNoPage from "../components/detail/tableNoPage";
import AttributesList from "../components/nft/detail/attributesList";

export default function NftClass() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(nftClassDetailSelector);
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
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/instances`;
  const timelineApiKey =
    detail &&
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/timeline`;
  const attributesApiKey =
    detail &&
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/attributes`;

  const MyNftClassTimeline = useCallback(
    ({ data, loading }) => (
      <NftClassTimeline nft={detail} timeline={data} loading={loading} />
    ),
    [detail],
  );

  const tabs = [
    {
      name: Instances,
      count: detail?.details?.items ?? detail?.details?.instances,
      children: (
        <DetailTable
          url={instancesApiKey}
          heads={nftClassInstanceHead}
          transformData={(instances) =>
            instances?.map((instance) =>
              toInstancesTabTableItem(detail, instance, showPreview),
            )
          }
        />
      ),
    },
    {
      name: Timeline,
      count: detail?.timelineCount,
      children: (
        <DetailTable url={timelineApiKey} TableComponent={MyNftClassTimeline} />
      ),
    },
    {
      name: Attributes,
      count: detail?.attributesCount,
      children: (
        <DetailTableNoPage
          url={attributesApiKey}
          TableComponent={AttributesList}
        />
      ),
    },
  ];

  const classIdWithoutHeight = classId.split("_").shift();

  let breadCrumb = [
    {
      name: "NFT",
      path: "/uniques",
    },
    { name: "Class" },
    { name: classIdWithoutHeight },
  ];

  if (detail?.isDestroyed) {
    breadCrumb = [
      {
        name: "Destroyed NFT",
        path: "/destroyed/uniques",
      },
      { name: "Class" },
      { name: classIdWithoutHeight },
    ];
  }

  return (
    <DetailLayout breadCrumb={<BreadCrumb data={breadCrumb} />}>
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
