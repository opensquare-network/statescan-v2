import React from "react";
import { ReactComponent as Loading } from "../components/icons/loading.svg";
import { Flex } from "../components/styled/flex";

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
            <Loading />
          </Flex>
        );
      }

      return <Component {...props} />;
    };
  };
};
