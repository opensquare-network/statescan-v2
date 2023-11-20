import DetailTable from "../../components/detail/table";
import { callsHead, extrinsicEventsHead } from "../../utils/constants";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { toEventTabTableItem } from "../../utils/viewFuncs/toTableItem";
import CallsTable, { toCallTableItem } from "../../components/call/callsTable";
import DetailTabs from "../../components/detail/tabs";
import PagingTable from "../../components/detail/pagingTable";
import isNil from "lodash.isnil";
import useOnChainExtrinsicData from "../../hooks/useOnChainExtrinsicData";
import useExtrinsicInfo from "../../hooks/useExtrinsicInfo";

export default function ExtrinsicDetailTabs({ extrinsic }) {
  const { useOnChainBlockData } = useChainSettings();

  const blockHeight = extrinsic?.indexer?.blockHeight;
  const extrinsicIndex = extrinsic?.indexer?.extrinsicIndex;

  const extrinsicId = extrinsic ? `${blockHeight}-${extrinsicIndex}` : null;

  const onChainExtrinsicData = useOnChainExtrinsicData(
    blockHeight,
    extrinsicIndex,
  );
  const extrinsicInfo = useExtrinsicInfo(onChainExtrinsicData);

  const events = extrinsicInfo?.events || extrinsic?.events || [];
  const calls = extrinsicInfo?.calls || extrinsic?.calls || [];

  const tabs = [
    {
      name: "events",
      count: extrinsic?.eventsCount,
      children: useOnChainBlockData ? (
        <PagingTable
          heads={extrinsicEventsHead}
          transformData={toEventTabTableItem}
          data={events}
          isLoading={isNil(events)}
        />
      ) : (
        <DetailTable
          url={extrinsicId ? `/extrinsics/${extrinsicId}/events` : ""}
          heads={extrinsicEventsHead}
          transformData={toEventTabTableItem}
        />
      ),
    },
    {
      name: "calls",
      count: extrinsic?.callsCount,
      children: useOnChainBlockData ? (
        <PagingTable
          heads={callsHead}
          transformData={toCallTableItem}
          data={calls}
          isLoading={isNil(calls)}
        />
      ) : (
        <DetailTable
          url={extrinsicId ? `/extrinsics/${extrinsicId}/calls` : ""}
          TableComponent={CallsTable}
        />
      ),
    },
  ];

  return <DetailTabs tabs={tabs} />;
}
