import { addressEllipsis } from "@osn/common";
import styled from "styled-components";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { Panel } from "../components/styled/panel";
import { Inter_14_500 } from "../styles/text";
import RecoveryDetailTabs from "../components/recovery/recovery/tabs";
import { useRecoveryData } from "../hooks/recovery/useRecoveryData";
import RecoveryListData from "../components/recovery/listData";
import { RECOVERY_STATUS } from "../utils/constants";
import capitalize from "lodash.capitalize";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoveryPage() {
  const { data, loading } = useRecoveryData();

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Recoveries", path: "/recoveries" },
            {
              name: data
                ? `${addressEllipsis(data?.lostAccount)}-${addressEllipsis(
                    data?.rescuerAccount,
                  )}-${Number(data?.created).toLocaleString()}`
                : "...",
            },
          ]}
        />
      }
    >
      <StyledPanel>
        <RecoveryListData
          loading={loading}
          lostAccount={data?.lostAccount}
          createdAt={data?.created}
          rescuer={data?.rescuerAccount}
          deposit={data?.deposit}
          status={
            <div
              style={{
                color: data?.isClosed
                  ? "var(--fontTertiary)"
                  : "var(--fillPositive)",
              }}
            >
              {data?.isClosed
                ? capitalize(RECOVERY_STATUS.CLOSED)
                : capitalize(RECOVERY_STATUS.ACTIVE)}
            </div>
          }
          threshold={data?.threshold}
          friends={data?.allFriends}
        />
      </StyledPanel>

      <RecoveryDetailTabs />
    </DetailLayout>
  );
}
