import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { addressEllipsis } from "@osn/common";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { useRecoverableDetailListData } from "../utils/hooks/recovery/useRecoverableDetailListData";
import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";
import RecoverableDetailTabs from "../components/recovery/recoverable/tabs";
import { useRecoverableData } from "../hooks/recovery/useRecoverableData";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoverablePage() {
  const { data, loading } = useRecoverableData();
  const listData = useRecoverableDetailListData(data);

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
        <List data={loading ? [] : listData} />
      </StyledPanel>

      <RecoverableDetailTabs />
    </DetailLayout>
  );
}
