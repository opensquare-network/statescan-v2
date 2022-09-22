import styled, { css } from "styled-components";
import { Panel } from "../../styled/panel";
import { ReactComponent as MenuFolded } from "./menu-folded.svg";
import { ReactComponent as MenuOpened } from "./menu-opened.svg";

const MenuIconStyle = css`
  path {
    stroke: ${(p) => p.theme.fontPrimary};
  }
`;

const MenuFoldedIcon = styled(MenuFolded)`
  ${MenuIconStyle};
`;

const MenuOpenedIcon = styled(MenuOpened)`
  ${MenuIconStyle};
`;

const MobileButtonWrapper = styled(Panel)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border: 1px solid ${(p) => p.theme.strokeBoxSelected};
`;

export default function MobileButton(props) {
  const { mobileMenuFolded } = props;
  let icon;
  if (mobileMenuFolded) {
    icon = <MenuFoldedIcon />;
  } else {
    icon = <MenuOpenedIcon />;
  }

  return <MobileButtonWrapper {...props}>{icon}</MobileButtonWrapper>;
}
