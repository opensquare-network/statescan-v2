import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "./logo.svg";
import { Flex, FlexBetween } from "../styled/flex";
import { Mobile, PC } from "../styled/responsive";
import { Inter_14_600 } from "../../styles/text";
import styled, { css } from "styled-components";
import MobileButton from "./mobile/button";
import ChainSwitch from "./chainSwitch";
import Link from "../styled/link";
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

const Wrapper = styled(FlexBetween)`
  margin: 0 auto;
  height: 68px;
`;

const MenuWrapper = styled.div`
  display: flex;
  margin-left: 64px;
`;

const MenuItem = styled.div`
  ${Inter_14_600};
  cursor: pointer;
  text-decoration: none;
  color: ${(p) => p.theme.fontPrimary};

  :hover {
    color: ${(p) => p.theme.theme500};
  }

  :not(:first-child) {
    margin-left: 40px;
  }

  @media screen and (max-width: 900px) {
    padding: 6px 12px;
    :hover {
      color: inherit;
      background: ${(p) => p.theme.fillPanel};
    }

    :not(:first-child) {
      margin-left: 0;
    }

    ${(p) =>
      p.selected &&
      css`
        background: ${(p) => p.theme.fillPanel};
      `}
  }
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
      <Flex>
        <Link
          to={`/`}
          onClick={() => {
            dispatch(closeMobileMenu());
          }}
        >
          <StyleLogo />
        </Link>
        <PC>
          <MenuWrapper>
            <Link to={`/`}>
              <MenuItem>Home</MenuItem>
            </Link>
            <SubMenu
              category="BlockChain"
              menus={menusBlockchain}
              divideIndex={4}
            />
          </MenuWrapper>
        </PC>
      </Flex>
      <PC>
        <ChainSwitch />
      </PC>
      <Mobile>
        <MobileButton
          onClick={() => {
            dispatch(toggle());
          }}
          mobileMenuFolded={!showMobileMenu}
        />
      </Mobile>
    </Wrapper>
  );
}
