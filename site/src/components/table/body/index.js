import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { useSelector } from "react-redux";
import { timeTypeSelector } from "../../../store/reducers/preferenceSlice";
import TimeBody from "./time";
import { withLoading } from "../../../HOC/withLoading";
import TableLoading from "../../loadings/tableLoading";

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Td = styled.td`
  padding: 16px 24px;
  ${Inter_14_500};
`;

const mapLoadingState = (props) => {
  const { data } = props;
  return {
    loadingStates: [data === null],
    loadingComponent: <TableLoading />,
  };
};

function TableBody({ heads, data = null }) {
  const timeType = useSelector(timeTypeSelector);

  if (data === null) {
    return null;
  }

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

export default withLoading(mapLoadingState)(TableBody);
