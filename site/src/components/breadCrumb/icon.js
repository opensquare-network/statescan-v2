import React, { useState, useEffect } from "react";
import importIcon from "../icons/meta";
import noop from "lodash.noop";
import Loading from "../loadings/loading";

function SvgIcon({ iconName, onError = noop }) {
  const [Icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    importIcon(iconName)
      .then((module) => {
        setIcon(module.default);
      })
      .catch(onError)
      .finally(() => setLoading(false));
  }, [iconName, onError]);

  if (loading) {
    return <Loading />;
  }

  if (!Icon) return null;

  return <img src={Icon} alt={iconName} />;
}

export default SvgIcon;
