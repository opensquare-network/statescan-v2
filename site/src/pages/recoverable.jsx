import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { addressEllipsis } from "@osn/common";
import { Panel } from "../components/styled/panel";
import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";
import RecoverableDetailTabs from "../components/recovery/recoverable/tabs";
import { useRecoverableData } from "../hooks/recovery/useRecoverableData";
import RecoveryListData from "../components/recovery/listData";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoverablePage() {
  const { data, loading } = useRecoverableData();

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Recoverables", path: "/recoverables" },
            {
              name: data
                ? `${addressEllipsis(data?.who)}-${Number(
                    data?.height,
                  ).toLocaleString()}`
                : "...",
            },
          ]}
        />
      }
    >
      <StyledPanel>
        <RecoveryListData
          loading={loading}
          lostAccount={data?.who}
          createdAt={data?.height}
          removedAt={data?.removedAt || {}}
          rescuer={data?.rescuer}
          deposit={data?.deposit}
          status={
            <div
              style={{
                color: data?.isActive
                  ? "var(--fillPositive)"
                  : "var(--fontTertiary)",
              }}
            >
              {data?.isActive ? "Active" : "Completed"}
            </div>
          }
          threshold={data?.threshold}
          friends={data?.friends}
        />
      </StyledPanel>

      <RecoverableDetailTabs />
    </DetailLayout>
  );
}
