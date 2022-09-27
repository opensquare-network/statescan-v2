import { ReactComponent as LoadingIcon } from "../icons/loading.svg";
import { Flex } from "../styled/flex";
import React from "react";

export default function Loading() {
  return (
    <Flex style={{ justifyContent: "center", padding: 64 }} className="loading">
      <LoadingIcon />
    </Flex>
  );
}
