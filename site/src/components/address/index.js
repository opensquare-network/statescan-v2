import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";
import { withCopy } from "../../HOC/withCopy";
import * as queryString from "query-string";
import { useIdentity } from "../../hooks/useIdentity";
import {
  ACCOUNT_IDENTITY_TAB_SUBTAB,
  ACCOUNT_IDENTITY_TAB_NAME,
} from "../../utils/constants";

const Wrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  a {
    width: 100%;
  }

  [href]:hover {
    cursor: pointer;
  }

  ${(p) =>
    p.maxWidth &&
    `max-width: ${
      typeof p.maxWidth === "number" ? `${p.maxWidth}px` : p.maxWidth
    };`}
`;

const CombinationWrapper = styled(Wrapper)`
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: border-box;
  height: 72px;
`;

const AddressLink = styled(ColoredMonoLink)`
  display: block;
  margin: 0;
`;

const AddressLinkWithCopy = withCopy(AddressLink);

export function Address({ address, ellipsis = true }) {
  const displayAddress = ellipsis ? addressEllipsis(address) : address;
  return (
    <AddressLink to={`/accounts/${address}`}>{displayAddress}</AddressLink>
  );
}

export function AddressAndIdentity({
  address,
  maxWidth = "100%",
  ellipsis = true,
}) {
  const identity = useIdentity(address);
  const displayAddress = ellipsis ? addressEllipsis(address) : address;

  const AddressTag = ellipsis ? AddressLink : AddressLinkWithCopy;

  if (!identity || identity?.info?.status === "NO_ID") {
    return (
      <AddressTag to={`/accounts/${address}`}>{displayAddress}</AddressTag>
    );
  }

  return (
    <CombinationWrapper style={{ maxWidth }}>
      <Link to={`/accounts/${address}`}>
        <Identity identity={identity} />
      </Link>
      <AddressTag to={`/accounts/${address}`}>{displayAddress}</AddressTag>
    </CombinationWrapper>
  );
}

function AddressOrIdentity({
  address,
  maxWidth = "100%",
  ellipsis = true,
  className,
  linkToIdentityRegistrarTimeline,
  linkToIdentityIdentityTimeline,
  linkToIdentitySubIdentityTimeline,
}) {
  const identity = useIdentity(address);
  const displayAddress = ellipsis ? addressEllipsis(address) : address;

  let linkAccountPage = `/accounts/${address}`;
  if (linkToIdentityRegistrarTimeline) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: ACCOUNT_IDENTITY_TAB_NAME,
      sub: ACCOUNT_IDENTITY_TAB_SUBTAB.REGISTRAR_TIMELINE,
    })}`;
  }
  if (linkToIdentityIdentityTimeline) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: ACCOUNT_IDENTITY_TAB_NAME,
      sub: ACCOUNT_IDENTITY_TAB_SUBTAB.IDENTITY_TIMELINE,
    })}`;
  }
  if (linkToIdentitySubIdentityTimeline) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: ACCOUNT_IDENTITY_TAB_NAME,
      sub: ACCOUNT_IDENTITY_TAB_SUBTAB.SUB_IDENTITY_TIMELINE,
    })}`;
  }

  if (!identity || identity?.info?.status === "NO_ID") {
    const AddressTag = ellipsis ? AddressLink : AddressLinkWithCopy;
    return <AddressTag to={linkAccountPage}>{displayAddress}</AddressTag>;
  }

  return (
    <Wrapper className={className} maxWidth={maxWidth}>
      <Link to={linkAccountPage}>
        <Identity maxWidth={maxWidth} identity={identity} />
      </Link>
    </Wrapper>
  );
}

export default AddressOrIdentity;
