import { gql } from "@apollo/client";
import Timeline from "../../timeline";
import IdentityTimelineItemFields from "./itemFields";
import IdentityTimelineItemIcon from "./itemIcon";
import { useState } from "react";
import { useIdentityQuery } from "../../../hooks/apollo";

export default function useIdentityTimeline(account) {
  const [data, setData] = useState(null);

  const GET_IDENTITY_TIMELINE = gql`
    query GetIdentityTimeline($account: String!) {
      identityTimeline(account: $account) {
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

  const { loading } = useIdentityQuery(GET_IDENTITY_TIMELINE, {
    variables: {
      account,
    },
    onCompleted(data) {
      setData(data);
    },
  });

  const timelineData = data?.identityTimeline || [];

  const component = (
    <Timeline
      timeline={timelineData}
      loading={loading}
      IconComponent={IdentityTimelineItemIcon}
      FieldsComponent={IdentityTimelineItemFields}
    />
  );

  return { data: timelineData, loading, component };
}
