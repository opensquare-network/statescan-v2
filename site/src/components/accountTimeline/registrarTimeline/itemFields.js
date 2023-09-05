import { stringUpperFirst } from "@polkadot/util";
import TimelineItemFields from "../../timeline/itemFields";
import { Text } from "../../timeline/styled";
import AddressOrIdentity from "../../address";
import ValueDisplay from "../../displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { toPrecision } from "@osn/common";
import { FlexColumn } from "../../styled/flex";

function getFields(timelineItem, chainSetting) {
  switch (timelineItem.name) {
    case "setFee": {
      return {
        Fee: (
          <Text>
            <ValueDisplay
              value={toPrecision(timelineItem.args.fee, chainSetting.decimals)}
              symbol={chainSetting.symbol}
            />
          </Text>
        ),
      };
    }
    case "setAccountId": {
      return {
        newAccount: (
          <AddressOrIdentity
            ellipsis={false}
            address={timelineItem.args.newAccount}
          />
        ),
      };
    }
    case "RegistrarAdded": {
      return {
        Index: <Text>{timelineItem.args.index}</Text>,
        Registrar: (
          <AddressOrIdentity
            ellipsis={false}
            address={timelineItem.args.registrar}
          />
        ),
      };
    }
    case "setFields": {
      return {
        Fields: (
          <FlexColumn style={{ gap: 4 }}>
            {timelineItem.args.fields?.map((field, index) => (
              <Text key={index}>{field}</Text>
            ))}
          </FlexColumn>
        ),
      };
    }
    default: {
      return Object.fromEntries(
        Object.entries(timelineItem.args).map(([key, value]) => [
          stringUpperFirst(key),
          <Text>{value.toString()}</Text>,
        ]),
      );
    }
  }
}

export default function IdentityTimelineItemFields({ item }) {
  const chainSetting = useSelector(chainSettingSelector);
  const fields = Object.entries(getFields(item, chainSetting));
  return <TimelineItemFields fields={fields} />;
}
