import { withLoading } from "../../HOC/withLoading";
import { Inter_12_600, Inter_14_600 } from "../../styles/text";
import Loading from "../loadings/loading";
import styled from "styled-components";
import { Flex } from "../styled/flex";
import {
  bg_theme,
  max_w_full,
  m_l,
  p_x,
  p_y,
  rounded_full,
  text_theme,
} from "../../styles/tailwindcss";
import Divider from "../styled/divider";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  @media screen and (max-width: 900px) {
    padding: ${(p) => (p.wrapperCompact ? 0 : "24px")};
    padding-bottom: 24px;
    padding-top: 0;
    margin: 0;
  }
`;

const Row = styled(Flex)`
  align-items: start;
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Label = styled.span`
  padding-top: ${(p) => (p.compact ? "8px" : "12px")};
  padding-bottom: ${(p) => (p.compact ? "8px" : "12px")};
  padding-left: 24px;
  flex-basis: 240px;
  min-width: 240px;
  ${Inter_14_600};
  color: ${({ theme }) => theme.fontPrimary};
  @media screen and (max-width: 900px) {
    padding: 0;
    margin-top: 24px;
    margin-bottom: 8px;
    flex-basis: 100%;
  }
`;

const Value = styled(Flex)`
  color: var(--fontPrimary);
  flex-grow: 1;
  padding-top: ${(p) => (p.compact ? "8px" : "12px")};
  padding-bottom: ${(p) => (p.compact ? "8px" : "12px")};
  /* label width - label padding left */
  max-width: calc(100% - 240px - 24px);
  @media screen and (max-width: 900px) {
    padding: 0;
    ${max_w_full};
  }
  white-space: pre-wrap;
  word-break: break-all;
`;

const Count = styled.span`
  ${p_y(2)};
  ${p_x(6)};
  ${Inter_12_600};
  ${text_theme("theme500")};
  ${bg_theme("theme100")};
  ${rounded_full};
  ${m_l(8)};
`;

const mapLoadingState = (props) => {
  const { data } = props;
  return {
    loadingStates: [!(Object?.keys(data)?.length > 0)],
    loadingComponent: <Loading />,
  };
};

function List({ data, header, compact = false, wrapperCompact = false }) {
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  }
  // compat object
  else {
    items = Object.keys(data).map((key) => {
      return {
        label: key,
        value: data[key],
      };
    });
  }

  return (
    <Wrapper wrapperCompact={wrapperCompact}>
      {header}

      {items.map((item, idx) =>
        item.type === "divider" ? (
          <Divider key={idx} />
        ) : (
          <Row key={idx}>
            <Label compact={compact}>
              {item.label}
              {!!item.count && <Count>{item.count}</Count>}
            </Label>
            <Value compact={compact}>{item.value}</Value>
          </Row>
        ),
      )}
    </Wrapper>
  );
}

export default withLoading(mapLoadingState)(List);
