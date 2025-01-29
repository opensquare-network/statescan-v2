import noop from "lodash.noop";
import MenuLinkItem from "./menuLinkItem";

export default function Menus({ menus = [], closeFunc = noop }) {
  return menus.map((item, idx) => (
    <MenuLinkItem key={idx} item={item} closeMobileMenu={closeFunc} />
  ));
}
