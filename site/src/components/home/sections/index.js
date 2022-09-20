import { FlexBetween } from "../../styled/flex";
import LatestBlocks from "./latestBlocks";
import { useEffect, useState } from "react";
import Api from "../../../services/api";

export default function Sections() {
  const [blocks, setBlocks] = useState([]);
  //todo: might use redux to pass data
  useEffect(() => {
    Api.fetch(`/blocks`).then(({ result }) => {
      setBlocks(result?.items ?? []);
    });
  }, []);

  return (
    <FlexBetween>
      <LatestBlocks blocks={blocks} />
    </FlexBetween>
  );
}
