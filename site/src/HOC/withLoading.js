import React from "react";

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

      if (findTrueInArray(arrayed(deps))) {
        return <div>Loading....</div>;
      }

      return <Component {...props} />;
    };
  };
};
