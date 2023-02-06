import React from "react";
import LoadingIcon from "../components/icons/loadingIcon";
import { Flex } from "../components/styled/flex";
import styled from "styled-components";
import {
  absolute,
  bg_theme,
  flex,
  inset_0,
  items_center,
  justify_center,
  overflow_hidden,
  relative,
  z_10,
} from "../styles/tailwindcss";

const BlockWrapper = styled.div`
  ${relative};
  ${(p) => p.isLoading && overflow_hidden};
`;
const BlockLoadingWrapper = styled.div`
  ${flex};
  ${justify_center};
  ${items_center};
  ${absolute};
  ${inset_0};
  ${z_10};
  ${bg_theme("fillPanelBlanket")};
  top: 50px;
`;

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

export function withTableLoading(_deps) {
  return (Component) => {
    return (props) => {
      let deps = _deps;
      if (typeof _deps === "function") {
        deps = _deps(props);
      }

      const isLoading = findTrueInArray(arrayed(deps.loadingStates));

      if (isLoading) {
        if (deps.loadingComponent) {
          return deps.loadingComponent;
        }

        return (
          <BlockWrapper isLoading={isLoading}>
            {isLoading && (
              <BlockLoadingWrapper>
                <LoadingIcon />
              </BlockLoadingWrapper>
            )}
            <Component {...props} />
          </BlockWrapper>
        );
      }

      return <Component {...props} />;
    };
  };
}
