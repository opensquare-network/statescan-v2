import styled from "styled-components";
import Identity from "./identity";
import { addressEllipsis, fetchIdentity } from "@osn/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import { useIsMounted } from "@osn/common";
import Link, { ColoredMonoLink } from "../styled/link";
import Tooltip from "../tooltip";

const Wrapper = styled.div`
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
  margin-bottom: 4px;
  line-height: 24px;
  text-align: right;
`;

function Address({ address }) {
  const [identity, setIdentity] = useState(null);
  const chainSetting = useSelector(chainSettingSelector);
  const relayChain = chainSetting.sub;
  const isMounted = useIsMounted();

  useEffect(() => {
    setIdentity(null);
    fetchIdentity(relayChain, address).then((identity) => {
      if (isMounted()) {
        setIdentity(identity);
      }
    });
  }, [address, relayChain, isMounted]);
  console.log(identity);
  if (!identity) {
    return (
      <Tooltip tip={address}>
        <AddressLink to={`/account/${address}`}>
          {addressEllipsis(address)}
        </AddressLink>
      </Tooltip>
    );
  }

  return (
    <Wrapper
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <Link to={`/account/${address}`}>
        <Identity identity={identity} />
      </Link>
      <span text={address}>
        <span>
          <span>
            <Link to={`/account/${address}`}>
              <a>
                <span>{address}</span>
              </a>
            </Link>
          </span>
        </span>
      </span>
    </Wrapper>
  );
}

export default Address;
