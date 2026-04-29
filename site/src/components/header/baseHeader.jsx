import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useWindowSize } from "@osn/common";
import { MOBILE_SIZE } from "@osn/constants";
import { Flex, FlexBetween } from "../styled/flex";
import { Mobile, PC } from "../styled/responsive";
import LinkOrigin from "../styled/link";
import MobileButton from "./mobile/button";
import {
  closeMobileMenu,
  mobileMenuFoldedSelector,
  toggle,
} from "../../store/reducers/mobileMenuSlice";
import { mobilecss } from "../../styles/responsive";
import { getChainLogo } from "../../utils/chain";
import { useScrollLock } from "../../utils/hooks/useScrollLock";
import { HeaderMenuItem } from "./styled";

const headerHeight = 68;

const StyleLogo = styled(getChainLogo())`
  path {
    fill: ${(props) => props.theme.fontPrimary};
  }
`;

const LogoLink = styled(LinkOrigin)`
  line-height: 0;
`;

const Wrapper = styled(FlexBetween)`
  height: ${headerHeight}px;
`;

export const HeaderMenuLink = styled(LinkOrigin)`
  display: block;
`;

export const HeaderMenuWrapper = styled(Flex)`
  margin-left: 64px;
`;

export const HeaderMenuText = styled(HeaderMenuItem)``;

const HeaderMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  background-color: ${(p) => p.theme.fillPanel};

  ${mobilecss(css`
    padding: 0 16px;
  `)}

  box-sizing: border-box;
  position: fixed !important;
  top: ${headerHeight}px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  z-index: 2;
  gap: 16px;
`;

export default function BaseHeader({ pc, mobile }) {
  const showMobileMenu = !useSelector(mobileMenuFoldedSelector);
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > MOBILE_SIZE) {
      dispatch(closeMobileMenu());
    }
  }, [dispatch, width]);

  const [, setIsLock] = useScrollLock();
  useEffect(() => setIsLock(showMobileMenu), [showMobileMenu, setIsLock]);

  const closeMenu = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <Wrapper>
      <FlexBetween style={{ flex: 1 }}>
        <LogoLink to={"/"} onClick={closeMenu} className=" lin">
          <StyleLogo />
        </LogoLink>

        <PC>{pc}</PC>

        <Mobile>
          <MobileButton
            onClick={() => {
              dispatch(toggle());
            }}
            mobileMenuFolded={!showMobileMenu}
          />
          {showMobileMenu && (
            <HeaderMobileMenuWrapper>{mobile}</HeaderMobileMenuWrapper>
          )}
        </Mobile>
      </FlexBetween>
    </Wrapper>
  );
}
