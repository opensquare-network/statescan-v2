import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { useSelector } from "react-redux";
import { timeTypeSelector } from "../../../store/reducers/preferenceSlice";
import TimeBody from "./time";

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Td = styled.td`
  padding: 16px 24px;
  ${Inter_14_500};
`;
export default function TableBody({ heads, data }) {
  const timeType = useSelector(timeTypeSelector);
  return (
    <tbody>
      {data.map((items, index) => {
        return (
          <Tr key={index}>
            {items.map((item, index) => {
              const { align, type } = heads[index];
              const style = {
                textAlign: align ?? "left",
              };

              if (type === "time") {
                return <TimeBody key={index} timeType={timeType} ts={item} />;
              }

              return (
                <Td style={style} key={index}>
                  {item}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </tbody>
  );
}
