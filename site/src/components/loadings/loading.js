import React from "react";
import LoadingIcon from "../icons/loadingIcon";
import { Flex } from "../styled/flex";

export default function Loading() {
  return (
    <Flex style={{ justifyContent: "center", padding: 64 }} className="loading">
      <LoadingIcon />
    </Flex>
  );
}
