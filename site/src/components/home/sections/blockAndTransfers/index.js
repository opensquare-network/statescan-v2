import React from "react";
import { SectionsWrapper } from "../styled";
import Blocks from "./blocks";
import Transfers from "./transfers";

export default function BlockAndTransfers() {
  return (
    <SectionsWrapper>
      <Blocks />
      <Transfers />
    </SectionsWrapper>
  );
}
