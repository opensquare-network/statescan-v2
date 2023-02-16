import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { useMemo } from "react";
import { currencify } from "../utils";
import { extrinsicEventsHead } from "../utils/constants";
import { toEventTabTableItem } from "../utils/viewFuncs/toTableItem";
import CallsTable from "../components/call/callsTable";
import DetailTable from "../components/detail/table";
import DetailLayout from "../components/layout/detailLayout";
import { toExtrinsicDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";
import {
  extrinsicDetailSelector,
  extrinsicFetchDetail,
  clearExtrinsicDetail,
} from "../store/reducers/extrinsicSlice";
import ExtrinsicParametersDisplayOrigin from "../components/extrinsicParametersDisplay";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";
import DetailTabs from "../components/detail/tabs";
import styled from "styled-components";

const ExtrinsicParametersDisplay = styled(ExtrinsicParametersDisplayOrigin)`
  padding: 24px;
`;

function Extrinsic() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const extrinsic = useSelector(extrinsicDetailSelector);

  const listData = useMemo(
    () => (extrinsic ? toExtrinsicDetailItem(extrinsic) : {}),
    [extrinsic],
  );

  const extrinsicId = useMemo(() => {
    if (!extrinsic) {
      return null;
    }

    return `${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`;
  }, [extrinsic]);

  const tabs = [
    {
      name: "events",
      count: extrinsic?.eventsCount,
      children: (
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
      children: (
        <DetailTable
          url={extrinsicId ? `/extrinsics/${extrinsicId}/calls` : ""}
          TableComponent={CallsTable}
        />
      ),
    },
  ];

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(extrinsicFetchDetail(id)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(clearExtrinsicDetail());
    };
  }, [id, dispatch]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Extrinsics", path: "/extrinsics" },
        {
          name: extrinsic
            ? `${currencify(extrinsic?.indexer?.blockHeight)}-${
                extrinsic?.indexer?.extrinsicIndex ?? ""
              }`
            : "...",
        },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
        <ExtrinsicParametersDisplay extrinsic={extrinsic} title="Parameters" />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default Extrinsic;
