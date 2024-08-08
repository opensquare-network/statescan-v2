import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import { useProxyAnnouncementData } from "../../hooks/proxy/useProxyAnnouncementData";
import ProxyAnnouncementListData from "../../components/proxy/tabs/announcements/listData";
import styled from "styled-components";
import { Panel } from "../../components/styled/panel";
import { Inter_14_500 } from "../../styles/text";
import ProxyAnnouncementTabs from "../../components/proxy/tabs/announcements/tabs";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function ProxyAnnouncementDetailPage() {
  const { id } = useParams();
  const { data, loading } = useProxyAnnouncementData(id);

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Proxy", path: "/proxy" },
            { name: "Announcements" },
            {
              name: id,
            },
          ]}
        />
      }
    >
      <StyledPanel>
        <ProxyAnnouncementListData
          loading={loading}
          callHash={data?.callHash}
          indexer={data?.indexer}
          normalizedCall={data?.normalizedCall}
          status={data?.state}
          removedAt={data?.removedAt}
          executedAt={data?.executedAt}
          rejectedAt={data?.rejectedAt}
        />
      </StyledPanel>

      {!loading && <ProxyAnnouncementTabs announcementId={id} />}
    </DetailLayout>
  );
}
