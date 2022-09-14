import React from "react";

function findTrueInArray(deps) {
  if (!deps.length) {
    return false;
  }
  return deps.reduce((result, each) => result || !!each, false);
}

function arrayed(loadingStates) {
  return Array.isArray(loadingStates) ? loadingStates : [loadingStates];
}

export const withLoading = (_deps) => {
  return (Component) => {
    return (props) => {
      let deps;
      if (typeof _deps === "function") deps = _deps(props);
      else deps = _deps;

      if (findTrueInArray(arrayed(deps))) {
        return <div>Loading....</div>;
      }

      return <Component {...props} />;
    };
  };
};
