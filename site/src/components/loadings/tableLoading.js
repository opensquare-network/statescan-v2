import React from "react";
import { Flex } from "../styled/flex";
import LoadingIcon from "../icons/loadingIcon";

export default function TableLoading() {
  return (
    <tbody>
      <tr>
        <td colSpan="100%">
          <Flex style={{ justifyContent: "center", padding: 64 }}>
            <LoadingIcon />
          </Flex>
        </td>
      </tr>
    </tbody>
  );
}
