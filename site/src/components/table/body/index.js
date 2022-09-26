import styled from "styled-components";
import { Inter_14_500 } from "../../../styles/text";
import { useSelector } from "react-redux";
import { timeTypeSelector } from "../../../store/reducers/preferenceSlice";
import TimeBody from "./time";
import { withLoading } from "../../../HOC/withLoading";
import TableLoading from "../../loadings/tableLoading";
import { ReactComponent as CaretRight } from "../../icons/caret-right.svg";
import { ReactComponent as CaretDown } from "../../icons/caret-down.svg";
import { Fragment, useState } from "react";
import InnerTable from "../nestedTable/innerTable";

const StyledButton = styled.button`
  all: unset;
  margin: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.strokeBox};
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.strokeBoxSelected};
  }

  svg path {
    stroke: ${({ theme }) => theme.fontSecondary};
  }
`;

const FoldButton = ({ onClick, fold }) => {
  return (
    <StyledButton onClick={onClick}>
      {fold ? <CaretRight /> : <CaretDown />}
    </StyledButton>
  );
};

const Tr = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
  text-align: left;
`;

const Td = styled.td`
  padding: 16px 24px;
  ${Inter_14_500};
`;

const InnerTableWrapper = styled.td`
  padding: 24px;
  ${Inter_14_500};
  background: ${({ theme }) => theme.fillBase}; ;
`;

const mapLoadingState = (props) => {
  const { data } = props;
  return {
    loadingStates: [data === null],
    loadingComponent: <TableLoading />,
  };
};

function TableRow({ heads, items = [] }) {
  const timeType = useSelector(timeTypeSelector);
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Tr>
        {items.map((item, index) => {
          const { align, type } = heads[index];
          const style = {
            textAlign: align ?? "left",
          };

          if (type === "time") {
            return <TimeBody key={index} timeType={timeType} ts={item} />;
          }

          if (type === "data") {
            return (
              <Td style={{ ...style, width: "100%" }} key={index}>
                <FoldButton fold={!show} onClick={() => setShow(!show)} />
              </Td>
            );
          }

          return (
            <Td style={style} key={index}>
              {item}
            </Td>
          );
        })}
      </Tr>
      {show ? (
        <Tr>
          <InnerTableWrapper colSpan={"100%"}>
            <InnerTable data={items[items.length - 1]} />
          </InnerTableWrapper>
        </Tr>
      ) : null}
    </Fragment>
  );
}

function TableBody({ heads, data = null }) {
  if (data === null) {
    return null;
  }

  return (
    <tbody>
      {data.map((items, index) => {
        return <TableRow heads={heads} items={items} key={index} />;
      })}
    </tbody>
  );
}

export default withLoading(mapLoadingState)(TableBody);
