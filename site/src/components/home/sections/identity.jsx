import { gql } from "@apollo/client";
import DataIdentityIcon from "../../icons/dataIdentity";
import DataRegistrarsIcon from "../../icons/dataRegistrars";
import DataRequestsIcon from "../../icons/dataRequests";
import DataSubIdentityIcon from "../../icons/dataSubIdentity";
import OverviewItem from "../overview/item";
import { OverviewItemsWrapper, OverviewPanel } from "../overview/styled";
import { currencify } from "../../../utils";
import Tooltip from "../../tooltip";
import LinkOrigin from "../../styled/link";
import styled from "styled-components";
import { GET_REGISTRARS } from "../../../services/gqls";
import { Inter_12_500 } from "../../../styles/text";
import IdentityIcon from "../../address/identityIcon";
import { IDENTITY_ID_TYPE, IDENTITY_TYPE } from "../../../utils/constants";
import capitalize from "lodash.capitalize";
import startCase from "lodash.startcase";
import Loading from "../../loadings/loading";
import { withLoading } from "../../../HOC/withLoading";
import { useIdentityQuery } from "../../../hooks/apollo";
import Dot from "../../dot";

const Link = styled(LinkOrigin)`
  &:hover {
    text-decoration: underline;
    color: var(--textPrimary);
  }
`;

const IdentityStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;
const IdentityStatusLink = styled(Link)`
  ${Inter_12_500};
  color: var(--fontSecondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const GET_STATISTICS = gql`
  query GetStatistics {
    identityStatistics {
      identity {
        erroneous
        unverified
        verified
      }
      registrars
      subIdentity
      judgementGiven
      request
    }
  }
`;

const mapLoadingState = (props) => {
  const { data } = props ?? {};

  return {
    loadingStates: [!data],
    loadingComponent: <Loading />,
  };
};

function IdentityOverview({ data }) {
  const { data: registrarsData } = useIdentityQuery(GET_REGISTRARS);
  const registrars = registrarsData?.identityRegistrars?.length || 0;

  const verifiedCount = data?.identityStatistics?.identity?.verified || 0;
  const unverifiedCount = data?.identityStatistics?.identity?.unverified || 0;
  const erroneousCount = data?.identityStatistics?.identity?.erroneous || 0;
  const totalIdentities = verifiedCount + unverifiedCount + erroneousCount;

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<DataIdentityIcon />}
          label="Direct identities"
          value={
            <div>
              <Tooltip tip="Direct identities">
                <Link to={`/identities?identityType=${IDENTITY_TYPE.DIRECT}`}>
                  {currencify(totalIdentities)}
                </Link>
              </Tooltip>
              <IdentityStatusWrapper>
                <Tooltip
                  tip={`${capitalize(IDENTITY_ID_TYPE.VERIFIED)} identities`}
                >
                  <IdentityStatusLink
                    to={`/identities?identityType=${IDENTITY_TYPE.DIRECT}&verificationStatus=${IDENTITY_ID_TYPE.VERIFIED}`}
                  >
                    <IdentityIcon status={IDENTITY_ID_TYPE.VERIFIED} />
                    {currencify(verifiedCount)}
                  </IdentityStatusLink>
                </Tooltip>
                <Tooltip
                  tip={`${capitalize(
                    startCase(IDENTITY_ID_TYPE.NOT_VERIFIED),
                  )} identities`}
                >
                  <IdentityStatusLink
                    to={`/identities?identityType=${IDENTITY_TYPE.DIRECT}&verificationStatus=${IDENTITY_ID_TYPE.NOT_VERIFIED}`}
                  >
                    <IdentityIcon status={IDENTITY_ID_TYPE.NOT_VERIFIED} />
                    {currencify(unverifiedCount)}
                  </IdentityStatusLink>
                </Tooltip>
                <Tooltip
                  tip={`${capitalize(IDENTITY_ID_TYPE.ERRONEOUS)} identities`}
                >
                  <IdentityStatusLink
                    to={`/identities?identityType=${IDENTITY_TYPE.DIRECT}&verificationStatus=${IDENTITY_ID_TYPE.ERRONEOUS}`}
                  >
                    <IdentityIcon status={IDENTITY_ID_TYPE.ERRONEOUS} />
                    {currencify(erroneousCount)}
                  </IdentityStatusLink>
                </Tooltip>
              </IdentityStatusWrapper>
            </div>
          }
        />
        <OverviewItem
          icon={<DataSubIdentityIcon />}
          label="Sub identities"
          value={
            <Tooltip tip="Sub identities">
              <Link to={`/identities?identityType=${IDENTITY_TYPE.SUB}`}>
                {currencify(data?.identityStatistics?.subIdentity || 0)}
              </Link>
            </Tooltip>
          }
        />
        <OverviewItem
          icon={<DataRegistrarsIcon />}
          label="Total registrars"
          value={
            <Tooltip tip="Total registrars">
              <Link to={"/identities/registrars"}>
                {currencify(registrars)}
              </Link>
            </Tooltip>
          }
        />
        <OverviewItem
          icon={<DataRequestsIcon />}
          label="Judgements"
          value={
            <div>
              <Tooltip
                tip="Total judgement requests"
                style={{ display: "inline-block" }}
              >
                <Link to={"/identities/judgements"}>
                  {currencify(data?.identityStatistics?.request || 0)}
                </Link>
              </Tooltip>
              <Dot style={{ margin: "0 8px" }} />
              <Tooltip
                tip="Total judgements given"
                style={{ display: "inline-block" }}
              >
                <Link to={"/identities/judgements?status=GIVEN"}>
                  {currencify(data?.identityStatistics?.judgementGiven || 0)}
                </Link>
              </Tooltip>
            </div>
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}

const IdentityOverviewWithLoading =
  withLoading(mapLoadingState)(IdentityOverview);

export default function IdentitySection() {
  const { data } = useIdentityQuery(GET_STATISTICS);

  return <IdentityOverviewWithLoading data={data} />;
}
