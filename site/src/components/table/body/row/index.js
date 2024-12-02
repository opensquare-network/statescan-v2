import {
  timeTypeSelector,
  tableSwitchFirstSelector,
} from "../../../../store/reducers/preferenceSlice";
import { Inter_14_500 } from "../../../../styles/text";
import InnerTable from "../../nestedTable/innerTable";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FoldButton from "./foldButton";
import TimeBody from "../time";
import SwitchBody from "../switch";

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Td = styled.td`
  padding: 16px 24px;
  ${Inter_14_500};
`;

const InnerTableWrapper = styled.td`
  /* HACK: make 'td' content overflow scroll */
  max-width: 0;
  padding: 24px;
  ${Inter_14_500};
  background: ${({ theme }) => theme.fillBase}; ;
`;

const WrapText = styled.span`
  word-break: break-all;
`;

function TableRow({ heads, row = [] }) {
  const timeType = useSelector(timeTypeSelector);
  const switchHeadFirst = useSelector(tableSwitchFirstSelector);
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Tr>
        {row.map((value, index) => {
          const { align, type } = heads[index];
          const style = {
            textAlign: align ?? "left",
          };

          if (type === "time") {
            return (
              <Td key={index}>
                <TimeBody timeType={timeType} ts={value} />
              </Td>
            );
          }

          if (type === "switch") {
            return (
              <Td key={index}>
                <SwitchBody switchHeadFirst={switchHeadFirst} value={value} />
              </Td>
            );
          }

          if (type === "data") {
            return (
              <Td style={{ ...style, width: "100%" }} key={index}>
                <FoldButton fold={!show} onClick={() => setShow(!show)} />
              </Td>
            );
          }

          if (type === "call") {
            return (
              <Td style={style} key={index}>
                <WrapText>{value}</WrapText>
              </Td>
            );
          }

          return (
            <Td style={style} key={index}>
              {value}
            </Td>
          );
        })}
      </Tr>
      {show ? (
        <Tr>
          <InnerTableWrapper colSpan={"100%"}>
            <InnerTable data={row[row.length - 1]} />
          </InnerTableWrapper>
        </Tr>
      ) : null}
    </Fragment>
  );
}

export default TableRow;
