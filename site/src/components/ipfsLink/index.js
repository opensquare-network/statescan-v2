import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { modeSelector } from "../../store/reducers/settingSlice";

const DataIcon = styled.div`
  width: 20px;
  height: 20px;
  ${(p) =>
    p.themeMode === "light"
      ? css`
          background: url("/imgs/icons/nft/ipfs-gray.svg");
        `
      : css`
          background: url("/imgs/icons/nft/ipfs-dark.svg");
        `}
  :hover {
    background: url("/imgs/icons/nft/ipfs.svg");
  }
`;

export default function IpfsLink({ cid }) {
  const themeMode = useSelector(modeSelector);

  return (
    <a
      href={`${process.env.REACT_APP_DEFAULT_IPFS_GATEWAY}${cid}`}
      target="_blank"
    >
      <DataIcon themeMode={themeMode} />
    </a>
  );
}
