import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";
import { withCopy } from "../../HOC/withCopy";
import * as queryString from "query-string";
import { useIdentity } from "../../hooks/useIdentity";
import {
  ACCOUNT_IDENTITY_TAB_NAME,
  ACCOUNT_IDENTITY_TAB_SUBTAB,
} from "../../utils/constants";
import { useMultisigAddressLazyData } from "../../hooks/multisig/useMultisigAddressData";
import { Tag } from "../tag";
import { useEffect } from "react";

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
  checkMultisig = false,
}) {
  const identity = useIdentity(address);
  const displayAddress = ellipsis ? addressEllipsis(address) : address;
  const [fetchMultisigAddressData, { data: multisigAddressData }] =
    useMultisigAddressLazyData(address);

  useEffect(() => {
    if (checkMultisig) {
      fetchMultisigAddressData();
    }
  }, [checkMultisig, fetchMultisigAddressData]);

  const AddressTag = ellipsis ? AddressLink : AddressLinkWithCopy;

  const addressContent = (
    <AddressTag to={`/accounts/${address}`}>
      {displayAddress}
      {multisigAddressData && <Tag style={{ marginLeft: 8 }}>Multisig</Tag>}
    </AddressTag>
  );

  if (!identity || identity?.info?.status === "NO_ID") {
    return addressContent;
  }

  return (
    <CombinationWrapper style={{ maxWidth }}>
      <Link to={`/accounts/${address}`}>
        <Identity identity={identity} />
      </Link>
      {addressContent}
    </CombinationWrapper>
  );
}

function AddressOrIdentity({
  address,
  maxWidth = "100%",
  ellipsis = true,
  className,
  linkToIdentityRegistrarTimeline,
  linkToIdentityTimeline,
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
  if (linkToIdentityTimeline) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: ACCOUNT_IDENTITY_TAB_NAME,
      sub: ACCOUNT_IDENTITY_TAB_SUBTAB.IDENTITY_TIMELINE,
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
