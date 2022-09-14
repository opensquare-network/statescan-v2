import React from "react";
import { withLoading } from "../../HOC/withLoading";

const mapLoadingState = (props) => {
  const { listLoading } = props;
  return [listLoading];
};

const BlocksList = (props) => {
  return <div>Some blocks</div>;
};

export default withLoading(mapLoadingState)(BlocksList);
