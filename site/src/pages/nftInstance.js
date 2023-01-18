import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailTable from "../components/detail/table";
import DetailTabs from "../components/detail/tabs";
import DetailLayout from "../components/layout/detailLayout";
import Panel from "../components/nft/detail/instanceInfoPanel";
import NftInstanceTimeline from "../components/nft/detail/instanceTimeline";
import { detailTablesSelector } from "../store/reducers/detailTablesSlice";
import {
  fetchNftInstanceDetail,
  nftInstanceDetailSelector,
  clearNftInstanceDetail,
} from "../store/reducers/nftInstanceSlice";
import {
  Attributes,
  nftTransfersHead,
  Timeline,
  Transfers,
} from "../utils/constants";
import DetailTableNoPage from "../components/detail/tableNoPage";
import AttributesList from "../components/nft/detail/attributesList";
import { toNftInstanceTransferTabTableItem } from "../utils/viewFuncs/toTableItem";

export default function NftInstance() {
  const { classId, instanceId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(nftInstanceDetailSelector);
  const tablesData = useSelector(detailTablesSelector);

  useEffect(() => {
    if (classId && instanceId) {
      dispatch(fetchNftInstanceDetail(classId, instanceId));
    }

    return () => {
      dispatch(clearNftInstanceDetail());
    };
  }, [dispatch, classId, instanceId]);

  const timelineApiKey =
    detail &&
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/instances/${detail?.instanceId}_${detail?.instanceHeight}/timeline`;
  const attributesApiKey =
    detail &&
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/instances/${detail?.instanceId}_${detail?.instanceHeight}/attributes`;
  const transfersApiKey =
    detail &&
    `/uniques/classes/${detail?.classId}_${detail?.classHeight}/instances/${detail?.instanceId}_${detail?.instanceHeight}/transfers`;

  const MyNftInstanceTimeline = useCallback(
    ({ data, loading }) => (
      <NftInstanceTimeline nft={detail} timeline={data} loading={loading} />
    ),
    [detail],
  );

  const tabs = [
    {
      name: Timeline,
      count: tablesData?.[timelineApiKey]?.total,
      children: (
        <DetailTable
          url={timelineApiKey}
          TableComponent={MyNftInstanceTimeline}
        />
      ),
    },
    {
      name: Attributes,
      count: tablesData?.[attributesApiKey]?.total,
      children: (
        <DetailTableNoPage
          url={attributesApiKey}
          TableComponent={AttributesList}
        />
      ),
    },
    {
      name: Transfers,
      count: tablesData?.[transfersApiKey]?.total,
      children: (
        <DetailTable
          url={transfersApiKey}
          heads={nftTransfersHead}
          transformData={(data) =>
            toNftInstanceTransferTabTableItem(data, detail?.class, detail)
          }
        />
      ),
    },
  ];

  let breadCrumb = [
    {
      name: "NFT",
      path: "/uniques",
    },
    { name: "Class" },
    { name: detail?.classId, path: `/uniques/classes/${classId}` },
    { name: "Instance" },
    { name: detail?.instanceId },
  ];

  if (detail?.class?.isDestroyed) {
    breadCrumb = [
      { name: "Destroyed" },
      {
        name: "NFT",
        path: "/destroyed/uniques",
      },
      { name: "Class" },
      { name: detail?.classId, path: `/uniques/classes/${classId}` },
      { name: "Instance" },
      { name: detail?.instanceId },
    ];
  }

  return (
    <DetailLayout breadCrumb={<BreadCrumb data={breadCrumb} />}>
      <Panel nftClass={detail?.class} nftInstance={detail} />
      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}
