import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb";
import DetailLayout from "../../components/layout/detailLayout";
import { useProxyData } from "../../hooks/proxy/useProxyData";
import ProxyListData from "../../components/proxy/listData";
import styled from "styled-components";
import { Panel } from "../../components/styled/panel";
import { Inter_14_500 } from "../../styles/text";
import ProxyDetailTabs from "../../components/proxy/tabs";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function ProxyDetailPage() {
  const { id } = useParams();
  const { data, loading } = useProxyData();

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Proxy", path: "/proxy" },
            {
              name: id,
            },
          ]}
        />
      }
    >
      <StyledPanel>
        <ProxyListData
          loading={loading}
          isPure={data?.isPure}
          delegator={data?.delegator}
          blockHeight={data?.indexer?.blockHeight}
          delegatee={data?.delegatee}
          type={data?.type}
          delay={data?.delay}
          isRemoved={data?.isRemoved}
        />
      </StyledPanel>

      {!loading && data?.delegatee && data?.delegator && data?.proxyId && (
        <ProxyDetailTabs
          delegatee={data?.delegatee}
          delegator={data?.delegator}
          proxyId={data?.proxyId}
        />
      )}
    </DetailLayout>
  );
}
