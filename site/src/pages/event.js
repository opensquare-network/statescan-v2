import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Api from "../services/api";
import { useParams } from "react-router-dom";
import List from "../components/list";
import DataDisplay from "../components/dataDisplay";
import { currencify } from "../utils";
import DetailLayout from "../components/layout/detailLayout";
import { toEventDetailItem } from "../utils/viewFuncs/toDetailItem";
import { useDispatch } from "react-redux";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHeandles";

function Event() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      Api.fetch(`/events/${id}`, {})
        .then(({ result: event }) => {
          setEvent(event);
          setListData(toEventDetailItem(event));
        })
        .catch((e) => handleApiError(e, dispatch));
    }
  }, [dispatch, id]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Events", path: "/events" },
        {
          name: event
            ? `${currencify(event?.indexer?.blockHeight)}-${
                event?.indexer?.eventIndex
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
        <DataDisplay
          tableData={event?.args}
          JSONData={event}
          title="Attributes"
        />
      </Panel>
    </DetailLayout>
  );
}

export default Event;
