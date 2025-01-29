import Link from "../../styled/link";
import { MenuItem } from "./common";

export default function MenuLinkItem({ item = {}, closeMobileMenu }) {
  if (!item.name) {
    return null;
  }

  return (
    <Link to={`/${item.value}`} onClick={closeMobileMenu}>
      <MenuItem disabled={!item.value}>{item.name}</MenuItem>
    </Link>
  );
}
