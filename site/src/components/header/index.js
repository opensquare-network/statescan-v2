import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "./logo.svg";
import { Flex, FlexBetween } from "../styled/flex";
import { Mobile, PC } from "../styled/responsive";
import { Inter_14_600 } from "../../styles/text";
import styled from "styled-components";
import MobileButton from "./mobile/button";
import ChainSwitch from "./chainSwitch";
import LinkOrigin from "../styled/link";
import SubMenu from "./subMenu";

import {
  mobileMenuFoldedSelector,
  toggle,
  closeMobileMenu,
} from "../../store/reducers/mobileMenuSlice";

const StyleLogo = styled(Logo)`
  path {
    fill: ${(props) => props.theme.fontPrimary};
  }
`;

const Link = styled(LinkOrigin)`
  display: block;
`;

const Wrapper = styled(FlexBetween)`
  margin: 0 auto;
  height: 68px;
`;

const MenuWrapper = styled(Flex)`
  margin-left: 64px;
`;

const MenuItem = styled.div`
  ${Inter_14_600};
  cursor: pointer;
  text-decoration: none;
  padding: 8px 12px;
`;

const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
  },
  {
    name: "Extrinsics",
    value: "extrinsics",
  },
  {
    name: "Events",
    value: "events",
  },
  {
    name: "Calls",
    value: "calls",
  },
  {
    name: "Transfers",
    value: "transfers",
  },
  {
    name: "Accounts",
    value: "accounts",
  },
];

export default function Header() {
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <FlexBetween style={{ flex: 1 }}>
        <Link
          to={`/`}
          onClick={() => {
            dispatch(closeMobileMenu());
          }}
        >
          <StyleLogo />
        </Link>

        <PC>
          <FlexBetween style={{ flex: 1 }}>
            <MenuWrapper>
              <Link to={`/`}>
                <MenuItem>Home</MenuItem>
              </Link>
              <MenuItem>
                <SubMenu
                  category="BlockChain"
                  menus={menusBlockchain}
                  divideIndex={4}
                />
              </MenuItem>
            </MenuWrapper>

            <ChainSwitch />
          </FlexBetween>
        </PC>

        <Mobile>
          <MobileButton
            onClick={() => {
              dispatch(toggle());
            }}
            mobileMenuFolded={!showMobileMenu}
          />
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
