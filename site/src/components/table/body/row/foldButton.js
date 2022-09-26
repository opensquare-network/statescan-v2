import styled from "styled-components";
import { ReactComponent as CaretRight } from "../../../icons/caret-right.svg";
import { ReactComponent as CaretDown } from "../../../icons/caret-down.svg";

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

export default FoldButton;
