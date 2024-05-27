import styled from "styled-components";
import { useSelector } from "react-redux";

import ToastItem from "./toastItem";
import { toastsSelector } from "../../store/reducers/toastSlice";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 0;
  left: 0;
  top: 0;
  z-index: 999;
`;

const ToastList = styled.div`
  margin: 60px auto auto;
  width: fit-content;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  > :not(:last-child) {
    margin-top: 16px;
  }
`;

const Toast = () => {
  const toasts = useSelector(toastsSelector);

  return (
    <Wrapper>
      <ToastList>
        {(toasts || []).map(({ type, message, id }) => (
          <ToastItem type={type} message={message} id={id} key={id} />
        ))}
      </ToastList>
    </Wrapper>
  );
};

export default Toast;
