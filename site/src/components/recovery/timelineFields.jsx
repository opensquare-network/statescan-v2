import startCase from "lodash.startcase";
import TimelineItemFields from "../timeline/itemFields";
import { isAddress } from "@polkadot/util-crypto";
import AddressOrIdentity from "../address";

export default function RecoveryTimelineFields({ item }) {
  const { args = {} } = item || {};

  const fields = Object.entries(args).map(([key, value]) => {
    return [
      startCase(key),
      isAddress(value) ? (
        <AddressOrIdentity address={value} key={value} ellipsis={false} />
      ) : (
        value
      ),
    ];
  });

  return <TimelineItemFields fields={fields} />;
}
