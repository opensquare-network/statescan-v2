import { addressEllipsis } from "@osn/common";
import styled from "styled-components";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import List from "../components/list";
import { Panel } from "../components/styled/panel";
import { useRecoveryQuery } from "../hooks/apollo";
import { GET_RECOVERY } from "../services/gql/recovery";
import { Inter_14_500 } from "../styles/text";
import { useRecoveryDetailListData } from "../utils/hooks/recovery/useRecoveryDetailListData";
import { useRecoveryParams } from "../utils/hooks/recovery/useRecoveryParams";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoveryPage() {
  const { address, rescuer, height } = useRecoveryParams();

  const { data, loading } = useRecoveryQuery(GET_RECOVERY, {
    variables: {
      created: height,
      lostAccount: address,
      rescuerAccount: rescuer,
    },
  });

  const listData = useRecoveryDetailListData(data?.recovery);

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Recoveries", path: "/recoveries" },
            {
              name: `${addressEllipsis(address)}-${addressEllipsis(
                rescuer,
              )}-${Number(height).toLocaleString()}`,
            },
          ]}
        />
      }
    >
      <StyledPanel>
        <List data={loading ? [] : listData} />
      </StyledPanel>
    </DetailLayout>
  );
}
