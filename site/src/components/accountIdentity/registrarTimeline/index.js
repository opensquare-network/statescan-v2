import { gql } from "@apollo/client";
import Timeline from "../../timeline";
import IdentityTimelineItemFields from "./itemFields";
import RegistrarTimelineItemIcon from "./itemIcon";
import { useState } from "react";
import { useIdentityQuery } from "../../../hooks/apollo";

export default function useRegistrarTimeline(account) {
  const [data, setData] = useState(null);

  const GET_REGISTRAR_TIMELINE = gql`
    query GetRegistrarTimeline($account: String!) {
      registrarTimeline(account: $account) {
        name
        args
        indexer {
          blockHeight
          blockHash
          blockTime
          extrinsicIndex
          eventIndex
        }
      }
    }
  `;

  const { loading } = useIdentityQuery(GET_REGISTRAR_TIMELINE, {
    variables: {
      account,
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const timelineData = data?.registrarTimeline || [];

  const component = (
    <Timeline
      timeline={timelineData}
      loading={loading}
      IconComponent={RegistrarTimelineItemIcon}
      FieldsComponent={IdentityTimelineItemFields}
    />
  );

  return { data: timelineData, loading, component };
}
