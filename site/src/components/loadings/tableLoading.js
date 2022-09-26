import { ReactComponent as Loading } from "../icons/loading.svg";
import { Flex } from "../styled/flex";
import React from "react";

export default function TableLoading() {
  return (
    <tbody>
      <tr>
        <td colSpan="100%">
          <Flex
            style={{ justifyContent: "center", padding: 64 }}
            className="loading"
          >
            <Loading />
          </Flex>
        </td>
      </tr>
    </tbody>
  );
}
