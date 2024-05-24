import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import DetailLayout from "../components/layout/detailLayout";
import { addressEllipsis } from "@osn/common";
import { useRecoveryQuery } from "../hooks/apollo";
import { GET_RECOVERABLE } from "../services/gql/recovery";
import { Panel } from "../components/styled/panel";
import List from "../components/list";
import { useRecoverableDetailListData } from "../utils/hooks/recovery/useRecoverableDetailListData";
import styled from "styled-components";
import { Inter_14_500 } from "../styles/text";

const StyledPanel = styled(Panel)`
  ${Inter_14_500}
`;

export default function RecoverablePage() {
  const { id } = useParams();
  const [address, height] = id.split("-");

  const { data, loading } = useRecoveryQuery(GET_RECOVERABLE, {
    variables: {
      height: Number(height),
      address,
    },
  });

  const listData = useRecoverableDetailListData(data?.recoverable);

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Recoverables", path: "/recoverables" },
            {
              name: `${addressEllipsis(address)}-${Number(
                height,
              ).toLocaleString()}`,
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