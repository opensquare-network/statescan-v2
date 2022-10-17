import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis, fetchIdentity } from "@osn/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import { useIsMounted } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";

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

const AddressLink = styled(ColoredMonoLink)`
  display: block;
  margin: 0;
  line-height: 24px;
  text-align: right;
`;

function Address({
  address,
  maxWidth = "100%",
  fontSize = 14,
  ellipsis = true,
}) {
  const [identity, setIdentity] = useState(null);
  const chainSetting = useSelector(chainSettingSelector);
  const relayChain = chainSetting.sub;
  const isMounted = useIsMounted();
  const displayAddress = ellipsis ? addressEllipsis(address) : address;

  useEffect(() => {
    setIdentity(null);
    fetchIdentity(relayChain, address).then((identity) => {
      if (isMounted) {
        setIdentity(identity);
      }
    });
  }, [address, relayChain, isMounted]);

  if (!identity) {
    return (
      <AddressLink style={{ fontSize }} to={`/account/${address}`}>
        {displayAddress}
      </AddressLink>
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

export default Address;
