import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "./toast-error.svg";
import { ReactComponent as SuccessIcon } from "./toast-success.svg";

import { removeToast } from "../../store/reducers/toastSlice";
import { bg_theme, border_theme, text_theme } from "../../styles/tailwindcss";

const Wrapper = styled.div`
  padding: 12px 16px;
  ${bg_theme("fillPopup")};
  font-size: 14px;
  line-height: 20px;
  ${text_theme("fontPrimary")};
  display: flex;
  align-items: center;
  > :not(:first-child) {
    margin-left: 8px;
  }

  & > .icon {
    display: inline-flex;
  }

  border: 1px solid rgb(244, 244, 244);
  ${border_theme("strokeBox")}
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.04),
    0px 1.80882px 5.94747px rgba(0, 0, 0, 0.0260636),
    0px 0.751293px 0.932578px rgba(0, 0, 0, 0.02),
    0px 0.271728px 0px rgba(0, 0, 0, 0.0139364);
  border-radius: 8px;
`;

const ToastItem = ({ type, message, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 2000);
  });

  if (!message) return null;
  return (
    <Wrapper>
      <div className="icon">
        {type === "error" ? <ErrorIcon /> : <SuccessIcon />}
      </div>
      <div>{message}</div>
    </Wrapper>
  );
};

export default ToastItem;
