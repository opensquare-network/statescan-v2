import { Flex, FlexBetween } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";
import styled, { css } from "styled-components";
import Container from "../layout/container";
import Link from "../styled/link";
import SubMenu from "./subMenu";

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

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <Flex>
          <img
            className="logo-full"
            src="/imgs/logo.svg"
            alt="logo"
            style={{ cursor: "pointer" }}
          />

          <MenuWrapper>
            <Link to={`/`}>
              <MenuItem>Home</MenuItem>
            </Link>
            <SubMenu category="BlockChain" menus={menusBlockchain} />
          </MenuWrapper>
        </Flex>
      </Wrapper>
    </Container>
  );
}
