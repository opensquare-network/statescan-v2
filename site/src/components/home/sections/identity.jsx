import DataIdentityIcon from "../../icons/dataIdentity";
import DataRegistrarsIcon from "../../icons/dataRegistrars";
import DataRequestsIcon from "../../icons/dataRequests";
import DataSubIdentityIcon from "../../icons/dataSubIdentity";
import OverviewItem from "../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../overview/styled";

export default function IdentitySection() {
  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<DataIdentityIcon />}
          label="Total identities"
          value={<div>1</div>}
        />
        <OverviewItem
          icon={<DataSubIdentityIcon />}
          label="Total sub identities"
          value={<div>1</div>}
        />
        <OverviewItem
          icon={<DataRegistrarsIcon />}
          label="Total registrars"
          value={<div>1</div>}
        />
        <OverviewItem
          icon={<DataRequestsIcon />}
          label="Requests"
          value={<div>1</div>}
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
