import { addressEllipsis } from "@osn/common";
import styled from "styled-components";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import List from "../components/list";
import { Panel } from "../components/styled/panel";
import { Inter_14_500 } from "../styles/text";
import { useRecoveryDetailListData } from "../utils/hooks/recovery/useRecoveryDetailListData";
import RecoveryDetailTabs from "../components/recovery/recovery/tabs";
import { useRecoveryData } from "../hooks/recovery/useRecoveryData";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoveryPage() {
  const { data, loading } = useRecoveryData();

  const listData = useRecoveryDetailListData(data);

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
        <List data={loading ? [] : listData} />
      </StyledPanel>

      <RecoveryDetailTabs />
    </DetailLayout>
  );
}
