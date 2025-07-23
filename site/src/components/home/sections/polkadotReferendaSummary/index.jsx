import useChainSettings from "../../../../utils/hooks/chain/useChainSettings";
import ReferendaSquareIcon from "../../../icons/referendaSquareIcon";
import OverviewItem from "../../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../../overview/styled";
import OverviewItemValueWithAll from "../../overview/valueWithAll";
import Loading from "../../../loadings/loading";
import usePolkadotReferendaSummary from "../../../../hooks/usePolkadotReferendaSummary";

export default function PolkadotReferendaSummary() {
  const { subSquareWebsite } = useChainSettings();
  const { summary, loading } = usePolkadotReferendaSummary();

  if (loading) {
    return <Loading style={{ padding: "24px" }} />;
  }

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Confirming"
          value={
            <OverviewItemValueWithAll
              label="Confirming"
              active={summary?.confirmingCount}
            />
          }
        />
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Deciding"
          value={
            <OverviewItemValueWithAll
              label="Deciding"
              active={summary?.decidingCount}
            />
          }
        />
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Preparing"
          value={
            <OverviewItemValueWithAll
              label="Preparing"
              active={summary?.preparingCount}
            />
          }
        />
        <OverviewItem
          icon={<ReferendaSquareIcon />}
          label="Active"
          value={
            <OverviewItemValueWithAll
              label="Active"
              active={summary?.activeCount}
              all={summary?.total}
              link={`${subSquareWebsite}/referenda`}
            />
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
