import { gql, useQuery } from "@apollo/client";
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
import { IDENTITY_ID_TYPE } from "../../../utils/constants";

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
  color: var(--fontSecondary);
  ${Inter_12_500};
`;
const IdentityStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const GET_STATISTICS = gql`
  query GetStatistics {
    statistics {
      identity {
        erroneous
        unverified
        verified
      }
      subIdentity
      judgementGiven
      request
    }
  }
`;

export default function IdentitySection() {
  const { data } = useQuery(GET_STATISTICS);
  const { data: registrarsData } = useQuery(GET_REGISTRARS);
  const registrars = registrarsData?.registrars?.length || 0;

  const verifiedCount = data?.statistics?.identity?.verified || 0;
  const unverifiedCount = data?.statistics?.identity?.unverified || 0;
  const erroneousCount = data?.statistics?.identity?.erroneous || 0;
  const totalIdentities = verifiedCount + unverifiedCount + erroneousCount;

  return (
    <OverviewPanel>
      <OverviewItemsWrapper>
        <OverviewItem
          icon={<DataIdentityIcon />}
          label="Total identities"
          value={
            <div>
              <Tooltip tip="Total identities">
                <Link to={"/identities?includeSubIdentities=false"}>
                  {currencify(totalIdentities)}
                </Link>
              </Tooltip>
              <IdentityStatusWrapper>
                <IdentityStatus>
                  <IdentityIcon
                    identity={{ info: { status: IDENTITY_ID_TYPE.VERIFIED } }}
                  />
                  {verifiedCount}
                </IdentityStatus>
                <IdentityStatus>
                  <IdentityIcon
                    identity={{
                      info: { status: IDENTITY_ID_TYPE.NOT_VERIFIED },
                    }}
                  />
                  {unverifiedCount}
                </IdentityStatus>
                <IdentityStatus>
                  <IdentityIcon
                    identity={{ info: { status: IDENTITY_ID_TYPE.ERRONEOUS } }}
                  />
                  {erroneousCount}
                </IdentityStatus>
              </IdentityStatusWrapper>
            </div>
          }
        />
        <OverviewItem
          icon={<DataSubIdentityIcon />}
          label="Total sub identities"
          value={
            <Tooltip tip="Total sub identities">
              <Link to={"/identities"}>
                {currencify(data?.statistics?.subIdentity || 0)}
              </Link>
            </Tooltip>
          }
        />
        <OverviewItem
          icon={<DataRegistrarsIcon />}
          label="Total registrars"
          value={
            <Tooltip tip="Total registrars">
              <Link to={"/registrars"}>{currencify(registrars)}</Link>
            </Tooltip>
          }
        />
        <OverviewItem
          icon={<DataRequestsIcon />}
          label="Requests"
          value={
            <div>
              <Tooltip tip="Requests given" style={{ display: "inline" }}>
                <Link to={"/requests"}>
                  {currencify(data?.statistics?.judgementGiven || 0)}
                </Link>
              </Tooltip>
              <span style={{ color: "var(--fontTertiary)", margin: "0 8px" }}>
                •
              </span>
              <Tooltip tip="Total requests" style={{ display: "inline" }}>
                <Link to={"/requests"}>
                  {currencify(data?.statistics?.request || 0)}
                </Link>
              </Tooltip>
            </div>
          }
        />
      </OverviewItemsWrapper>
    </OverviewPanel>
  );
}
