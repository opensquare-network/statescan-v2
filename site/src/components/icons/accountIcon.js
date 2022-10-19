import styled from "styled-components";
import { ReactComponent as Account } from "./account.svg";

const AccountIcon = styled(Account)`
  path {
    fill: ${(p) => p.theme.fontTertiary};
  }
`;

export default AccountIcon;
