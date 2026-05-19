import isNil from "lodash.isnil";
import LoadableContent from "../../loadings/loadableContent";
import { TagThemed } from "../../tag";
import { useLidoCsmExtendedManagerPermissionsData } from "../../../hooks/lido/useLidoCsmExtendedManagerPermissionsData";

function renderPermissions(value) {
  if (isNil(value)) {
    return "--";
  }

  return <TagThemed>{value ? "Enabled" : "Disabled"}</TagThemed>;
}

export default function LidoCsmExtendedManagerPermissions({
  value,
  moduleAddress,
  nodeOperatorId,
}) {
  const shouldFetch = isNil(value);
  const { data, loading } = useLidoCsmExtendedManagerPermissionsData(
    shouldFetch ? moduleAddress : null,
    nodeOperatorId,
  );
  const permissions = shouldFetch ? data : value;

  return (
    <LoadableContent loading={loading}>
      {renderPermissions(permissions)}
    </LoadableContent>
  );
}
