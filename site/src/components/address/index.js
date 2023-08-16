import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis, fetchIdentity } from "@osn/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import { useIsMounted } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";
import { withCopy } from "../../HOC/withCopy";
import * as queryString from "query-string";

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
  const [identity, setIdentity] = useState(null);
  const chainSetting = useSelector(chainSettingSelector);
  const identityChain = chainSetting.identity;
  const isMounted = useIsMounted();
  const displayAddress = ellipsis ? addressEllipsis(address) : address;

  useEffect(() => {
    setIdentity(null);
    fetchIdentity(identityChain, address).then((identity) => {
      if (isMounted) {
        setIdentity(identity);
      }
    });
  }, [address, identityChain, isMounted]);

  const AddressTag = ellipsis ? AddressLink : AddressLinkWithCopy;

  if (!identity) {
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
  linkToTimelineRegistrarPage,
  linkToTimelineIdentityPage,
}) {
  const [identity, setIdentity] = useState(null);
  const chainSetting = useSelector(chainSettingSelector);
  const identityChain = chainSetting.identity;
  const isMounted = useIsMounted();
  const displayAddress = ellipsis ? addressEllipsis(address) : address;

  useEffect(() => {
    setIdentity(null);
    fetchIdentity(identityChain, address).then((identity) => {
      if (isMounted) {
        setIdentity(identity);
      }
    });
  }, [address, identityChain, isMounted]);

  let linkAccountPage = `/accounts/${address}`;
  if (linkToTimelineRegistrarPage) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: "timeline",
      sub: "registrar",
    })}`;
  }
  if (linkToTimelineIdentityPage) {
    linkAccountPage = `${linkAccountPage}?${queryString.stringify({
      tab: "timeline",
      sub: "identity",
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
