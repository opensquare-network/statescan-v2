import startCase from "lodash.startcase";
import TimelineItemFields from "../timeline/itemFields";
import { isAddress } from "@polkadot/util-crypto";
import AddressOrIdentity from "../address";

export default function RecoveryTimelineFields({ item }) {
  const { args = {}, name } = item || {};

  let fields;

  if (name === "RecoveryVouched") {
    fields = [
      [
        "Voucher",
        <AddressOrIdentity
          address={args.sender}
          key={args.sender}
          ellipsis={false}
        />,
      ],
    ];
  } else {
    fields = Object.entries(args).map(([key, value]) => {
      return [
        startCase(key),
        isAddress(value) ? (
          <AddressOrIdentity address={value} key={value} ellipsis={false} />
        ) : (
          value
        ),
      ];
    });
  }

  return <TimelineItemFields fields={fields} />;
}
