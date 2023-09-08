import styled from "styled-components";
import TimelineItemFieldsOrigin from "../timeline/itemFields";
import ExternalLink from "../externalLink";
import InnerTable from "../table/nestedTable/innerTable";
import { Text } from "../timeline/styled";

const Wrapper = styled.div`
  padding: 24px;
`;
const TimelineItemFields = styled(TimelineItemFieldsOrigin)`
  border-bottom: none;
  padding-bottom: 0;

  a {
    color: inherit;
    text-decoration: none;
  }
`;
const AdditionalWrapper = styled.div``;
const AdditionalTableWrapper = styled.div`
  padding: 24px;
  border-radius: 4px;
  background-color: var(--fillBase);
  color: var(--fontPrimary);
`;

export default function AccountIdentityInfo({ info = {}, display = "" }) {
  const fields = [
    ["Display", <Text>{display}</Text>],
    ["Legal", <Text>{info?.legal || "null"}</Text>],
    ["Web", <Text>{info?.web || "null"}</Text>],
    ["Riot", <Text>{info?.riot || "null"}</Text>],
    ["Email", <Text>{info?.email || "null"}</Text>],
    ["Image", <Text>{info?.image || "null"}</Text>],
    ["PGP Fingerpint", <Text>{info?.pgpFingerprint || "null"}</Text>],
    ["Twitter", <Text>{info?.twitter || "null"}</Text>],
    ["Additional"],
  ];

  return (
    <Wrapper>
      <TimelineItemFields fields={fields} />
      <AdditionalWrapper>
        <AdditionalTableWrapper>
          <InnerTable data={info?.additional} />
        </AdditionalTableWrapper>
      </AdditionalWrapper>
    </Wrapper>
  );
}
