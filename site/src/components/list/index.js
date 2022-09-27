import { withLoading } from "../../HOC/withLoading";
import { Inter_14_600 } from "../../styles/text";
import Loading from "../loadings/loading";
import styled from "styled-components";
import { Flex } from "../styled/flex";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  @media screen and (max-width: 900px) {
    padding: 24px;
    padding-top: 0;
    margin: 0;
  }
`;

const Row = styled(Flex)`
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Label = styled.span`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  flex-basis: 240px;
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
  flex-grow: 1;
  min-height: 44px;
  @media screen and (max-width: 900px) {
    min-height: 20px;
  }
  white-space: pre-wrap;
  word-break: break-all;
`;

const mapLoadingState = (props) => {
  const { data } = props;
  return {
    loadingStates: [!(Object?.keys(data)?.length > 0)],
    loadingComponent: <Loading />,
  };
};

function List({ data }) {
  return (
    <Wrapper>
      {Object.keys(data).map((key, index) => {
        return (
          <Row key={index}>
            <Label>{key}</Label>
            <Value>{data[key]}</Value>
          </Row>
        );
      })}
    </Wrapper>
  );
}

export default withLoading(mapLoadingState)(List);
