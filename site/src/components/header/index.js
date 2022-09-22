import { ReactComponent as Logo } from "./logo.svg";
import { Flex, FlexBetween } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";
import styled, { css } from "styled-components";
import Container from "../layout/container";
import { Mobile, PC } from "../styled/responsive";
import MobileButton from "./mobile/button";
import ChainSwitch from "./chainSwitch";
import { Panel } from "../styled/panel";
import Link from "../styled/link";
import SubMenu from "./subMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mobileMenuFoldedSelector,
  toggle,
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
  ${Inter_14_500};
  cursor: pointer;
  text-decoration: none;

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
];

const MobileMenu = styled(Panel)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border: 1px solid ${(p) => p.theme.strokeBoxSelected};
`;

export default function Header() {
  const showMobileMenu = useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  return (
    <Container style={{ zIndex: 1 }}>
      <Wrapper>
        <Flex>
          <Link to={`/`}>
            <StyleLogo />
          </Link>
          <PC>
            <MenuWrapper>
              <Link to={`/`}>
                <MenuItem>Home</MenuItem>
              </Link>
              <SubMenu category="BlockChain" menus={menusBlockchain} />
            </MenuWrapper>
          </PC>
        </Flex>
        <PC>
          <ChainSwitch />
        </PC>
        <Mobile>
          <MobileMenu>
            <MobileButton
              onClick={() => {
                // setMobileMenuFolded(!mobileMenuFolded);
                dispatch(toggle());
              }}
              mobileMenuFolded={!showMobileMenu}
            />
          </MobileMenu>
        </Mobile>
      </Wrapper>
    </Container>
  );
}
