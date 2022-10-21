import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis, fetchIdentity } from "@osn/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import { useIsMounted } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";
import { withCopy } from "../../HOC/withCopy";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    width: 100%;
  }

  [href]:hover {
    cursor: pointer;
  }
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
  line-height: 24px;
  text-align: right;
`;

const AddressLinkWithCopy = withCopy(AddressLink);

export function AddressAndIdentity({
  address,
  maxWidth = "100%",
  fontSize = 14,
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
      <AddressTag style={{ fontSize }} to={`/account/${address}`}>
        {displayAddress}
      </AddressTag>
    );
  }

  return (
    <CombinationWrapper style={{ maxWidth }}>
      <Link to={`/account/${address}`}>
        <Identity identity={identity} fontSize={fontSize} />
      </Link>
      <AddressTag style={{ fontSize }} to={`/account/${address}`}>
        {displayAddress}
      </AddressTag>
    </CombinationWrapper>
  );
}

function AddressOrIdentity({
  address,
  maxWidth = "100%",
  fontSize = 14,
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

  if (!identity) {
    const AddressTag = ellipsis ? AddressLink : AddressLinkWithCopy;
    return (
      <AddressTag style={{ fontSize }} to={`/account/${address}`}>
        {displayAddress}
      </AddressTag>
    );
  }

  return (
    <Wrapper style={{ maxWidth }}>
      <Link to={`/account/${address}`}>
        <Identity identity={identity} fontSize={fontSize} />
      </Link>
    </Wrapper>
  );
}

export default AddressOrIdentity;
