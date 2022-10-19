import React from "react";
import { ReactComponent as Loading } from "../components/icons/loading.svg";
import { Flex } from "../components/styled/flex";
import styled from "styled-components";

const LoadingIcon = styled(Loading)``;

const TdLoadingWrapper = styled.td`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const TbodyWrapper = ({ children }) => {
  return (
    <tbody className="loading">
      <tr>
        <TdLoadingWrapper>{children}</TdLoadingWrapper>
      </tr>
    </tbody>
  );
};

function findTrueInArray(deps) {
  return (deps || []).some((item) => !!item);
}

function arrayed(loadingStates) {
  return Array.isArray(loadingStates) ? loadingStates : [loadingStates];
}

export const withLoading = (_deps) => {
  return (Component) => {
    return (props) => {
      let deps = _deps;
      if (typeof _deps === "function") {
        deps = _deps(props);
      }
      if (findTrueInArray(arrayed(deps.loadingStates))) {
        if (deps.loadingComponent) {
          return deps.loadingComponent;
        }
        return (
          <Flex
            style={{ justifyContent: "center", padding: 64 }}
            className="loading"
          >
            <LoadingIcon />
            <Component {...props} />
          </Flex>
        );
      }

      return <Component {...props} />;
    };
  };
};

export const withLoadingTbody = (_deps) => {
  return (Component) => {
    return (props) => {
      let deps = _deps;
      if (typeof _deps === "function") {
        deps = _deps(props);
      }
      if (findTrueInArray(arrayed(deps.loadingStates))) {
        if (props?.data === null && deps.loadingComponent) {
          return deps.loadingComponent;
        }
        return (
          <>
            <TbodyWrapper>
              <LoadingIcon />
            </TbodyWrapper>
            <Component {...props} />
          </>
        );
      }

      return <Component {...props} />;
    };
  };
};
