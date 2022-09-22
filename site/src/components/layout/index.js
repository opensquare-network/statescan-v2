import styled, { css, ThemeProvider } from "styled-components";
import Container from "./container";
import Header from "../header";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/modeSlice";
import light from "../../styles/theme/light";
import Background from "../dotBackground";
import Footer from "../footer";
import dark from "../../styles/theme/dark";
import ChainSwitch from "../header/chainSwitch";
import { Fragment } from "react";
import Link from "../styled/link";
import { Inter_14_500 } from "../../styles/text";
import { mobileMenuFoldedSelector } from "../../store/reducers/mobileMenuSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.fillPanel};
`;

const Main = styled.main`
  flex-grow: 1;
  margin-top: 24px;
  z-index: 1;
`;

const MenuWrapper = styled.div`
  min-width: 160px;
  background: ${(p) => p.theme.fillPanel};
  @media screen and (max-width: 900px) {
    position: static;
    box-shadow: none;
    transform: none;
    padding: 0;
    border: none;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  ${Inter_14_500};

  :hover {
    background: ${(p) => p.theme.fillPanelHover};
    color: ${(p) => p.theme.fontPrimary};
  }

  @media screen and (max-width: 900px) {
    padding: 8px 12px 8px 24px;
    color: rgba(17, 17, 17, 0.65);
  }
  ${(p) =>
    p.selected &&
    css`
      background: ${(p) => p.theme.fillPanelHover};
    `}
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.fillPanel};
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const SubMenuItem = styled(MenuItem)`
  padding: 8px 24px;
`;

const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
  },
];

export default function Layout({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;
  const showMobileMenu = useSelector(mobileMenuFoldedSelector);

  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Wrapper>
        <Header />
        <Main>
          <Container>{children}</Container>
        </Main>
        {showMobileMenu && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "white",
              zIndex: 1,
              overflow: "scroll",
            }}
          >
            <Header />
            <ChainSwitch />
            <MenuWrapper>
              {menusBlockchain.map((item, index) => (
                <Fragment key={index}>
                  <Link to={`/${item.value}`}>
                    <MenuItem disabled={item.value === ""}>
                      {item.name}
                    </MenuItem>
                  </Link>
                  {(item.children ?? []).map((child, index) => {
                    return (
                      <Fragment key={index}>
                        <Link to={`/${child.value}`}>
                          <SubMenuItem disabled={child.value === ""}>
                            {child.name}
                          </SubMenuItem>
                        </Link>
                      </Fragment>
                    );
                  })}
                </Fragment>
              ))}
            </MenuWrapper>
          </div>
        )}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
