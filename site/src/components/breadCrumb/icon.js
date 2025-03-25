import React, { useState, useEffect } from "react";
import importIcon from "../icons/meta";
import noop from "lodash.noop";

function SvgIcon({ iconName, onError = noop }) {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    importIcon(iconName)
      .then((module) => {
        setIcon(module.default);
      })
      .catch(onError);
  }, [iconName, onError]);

  if (!Icon) return null;

  return <img src={Icon} alt={iconName} />;
}

export default SvgIcon;
