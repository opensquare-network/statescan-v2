import Loading from "../../loadings/loading";
import NoData from "../../noData";
import List from "../../list";
import styled, { css } from "styled-components";
import maybeHexToUft8 from "../../../utils/hex";
import { Inter_14_500, Inter_14_600 } from "../../../styles/text";

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  ${Inter_14_600}

  margin-right: 24px;

  ${(props) =>
    !props.isLast &&
    css`
      padding-bottom: 24px;
      margin-bottom: 24px;
      border-bottom: 1px solid ${(p) => p.theme.strokeBase};
    `};
`;

const RowItem = styled.div`
  width: 100%;
  ${Inter_14_500}
  color: ${(p) => p.theme.fontPrimary};

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

function Info({ attr, isLast }) {
  return (
    <Row isLast={isLast}>
      <RowItem>{maybeHexToUft8(attr.key)}</RowItem>
      <RowItem>{maybeHexToUft8(attr.value)}</RowItem>
    </Row>
  );
}

export default function AttributesList({ data, loading }) {
  if (!data || loading) {
    return <Loading />;
  }

  if (!data?.length) {
    return <NoData />;
  }

  const listData = data.reduce(
    (prev, curr, index) => ({
      ...prev,
      [`#${index + 1}`]: (
        <Info attr={curr} isLast={index === data.length - 1} />
      ),
    }),
    {},
  );
  return <List data={listData} />;
}
