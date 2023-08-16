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
    case "JudgementRequested":
    case "JudgementUnrequested": {
      return {
        RegistrarIndex: <Text>{timelineItem.args.registrar?.index}</Text>,
        RegistrarAddress: (
          <AddressOrIdentity
            ellipsis={false}
            address={timelineItem.args.registrar?.account}
          />
        ),
      };
    }
    case "JudgementGiven": {
      return {
        RegistrarIndex: <Text>{timelineItem.args.registrarIndex}</Text>,
        RegistrarAddress: (
          <AddressOrIdentity
            ellipsis={false}
            address={timelineItem.args.registrarAddress}
          />
        ),
        Judgement: <Text>{timelineItem.args.judgement}</Text>,
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
    case "setSubs": {
      if (timelineItem.args.subs) {
        return {
          Subs: (
            <FlexColumn style={{ gap: 4 }}>
              {timelineItem.args.subs?.map(({ account }) => (
                <AddressOrIdentity
                  key={account}
                  ellipsis={false}
                  address={account}
                />
              ))}
            </FlexColumn>
          ),
        };
      }

      if (timelineItem.args.parent) {
        return {
          Parent: (
            <AddressOrIdentity
              ellipsis={false}
              address={timelineItem.args.parent}
            />
          ),
        };
      }

      return {};
    }
    case "renameSub": {
      if (timelineItem.args.sub) {
        return {
          Sub: (
            <AddressOrIdentity
              ellipsis={false}
              address={timelineItem.args.sub}
            />
          ),
        };
      }

      if (timelineItem.args.parent) {
        return {
          Parent: (
            <AddressOrIdentity
              ellipsis={false}
              address={timelineItem.args.parent}
            />
          ),
        };
      }

      return {};
    }
    case "IdentityKilled": {
      return {
        Slashed: (
          <Text>
            <ValueDisplay
              value={toPrecision(
                timelineItem.args.slashed,
                chainSetting.decimals,
              )}
              symbol={chainSetting.symbol}
            />
          </Text>
        ),
      };
    }
    case "SubIdentityAdded":
    case "SubIdentityRemoved":
    case "SubIdentityRevoked": {
      const args = {
        Deposit: (
          <Text>
            <ValueDisplay
              value={toPrecision(
                timelineItem.args.deposit,
                chainSetting.decimals,
              )}
              symbol={chainSetting.symbol}
            />
          </Text>
        ),
      };

      if (timelineItem.args.sub) {
        return {
          Sub: (
            <AddressOrIdentity
              ellipsis={false}
              address={timelineItem.args.sub}
            />
          ),
          ...args,
        };
      }

      if (timelineItem.args.parent) {
        return {
          Parent: (
            <AddressOrIdentity
              ellipsis={false}
              address={timelineItem.args.parent}
            />
          ),
          ...args,
        };
      }

      return args;
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
