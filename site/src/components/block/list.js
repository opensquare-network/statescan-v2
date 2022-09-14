import React from "react";
import { withLoading } from "../../HOC/withLoading";
import styled from "styled-components";
import { Inter_40_700, SF_Mono_14_500 } from "../../styles/text";

const BlockListWrapper = styled.div`
  ${Inter_40_700};
`;

const Text = styled.span`
  ${SF_Mono_14_500};
`;

const mapLoadingState = (props) => {
  const { listLoading } = props;
  return [listLoading];
};

const BlocksList = (props) => {
  return (
    <>
      <BlockListWrapper>blocks</BlockListWrapper>
      <Text>medium</Text>
    </>
  );
};

export default withLoading(mapLoadingState)(BlocksList);
