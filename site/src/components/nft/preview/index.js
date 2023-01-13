import { useEffect } from "react";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import SquareBox from "./squareBox";
import NftImage from "../image";
import { useKeyPress } from "../../../utils/hooks/useKeyPress";
import { time } from "../../../utils/viewFuncs/time";
import AddressOrIdentity from "../../address";
import NftInfo from "../info";
import { ColoredInterLink } from "../../styled/link";
import { getNftClassLink } from "../../../utils/nft";
import { Inter_14_500 } from "../../../styles/text";

const MyModal = styled(Modal)`
  > div {
    box-shadow: none;
    border: none;
  }

  background-color: ${(p) => p.theme.fillBase} !important;
  padding: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > div {
    padding: 0;
  }
`;

const Row = styled.div`
  margin-bottom: 16px;
  width: 50%;
`;

const Field = styled.div`
  ${Inter_14_500}
  color: ${(p) => p.theme.fontTertiary};
`;

const Value = styled.div`
  margin-top: 4px;
  ${Inter_14_500}
  color: ${(p) => p.theme.fontSecondary};
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    all: unset;
    border: 1px solid ${(p) => p.theme.strokeBox};
    background-color: ${(p) => p.theme.fillBub};
  }
  a {
    display: block;
    border: 1px solid ${(p) => p.theme.strokeBoxSelected};
    font-weight: 600;
    font-size: 15px;
    line-height: 44px;
    :hover {
      color: ${(p) => p.theme.fontPrimary};
    }
  }
  button,
  a {
    cursor: pointer;
    border-radius: 8px;
    text-align: center;
    height: 42px;
    flex-grow: 1;
    color: ${(p) => p.theme.fontPrimary};
  }
  > :not(:first-child) {
    margin-left: 16px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${(p) => p.theme.strokeBox};
  margin: 24px 0 16px 0;
  width: 100%;
`;

export default function Preview({ open, nftClass, onClose }) {
  const parsedMetadata = nftClass?.parsedMetadata;
  const detailLink = nftClass && getNftClassLink(nftClass);

  const pressEscape = useKeyPress("Escape");

  useEffect(() => {
    if (pressEscape) {
      onClose();
    }
  }, [pressEscape, onClose]);

  return (
    <MyModal open={open} size="tiny" onClose={onClose}>
      <Wrapper>
        <div style={{ width: "100%", marginBottom: "24px" }}>
          <SquareBox background={parsedMetadata?.background}>
            <NftImage parsedMetadata={parsedMetadata} />
          </SquareBox>
        </div>

        <NftInfo
          title={parsedMetadata?.name ?? "[Unrecognized]"}
          description={parsedMetadata?.description ?? "-"}
        />

        <Divider />

        <Row>
          <Field>Created Time</Field>
          <Value>{time(nftClass?.indexer?.blockTime)}</Value>
        </Row>

        <Row>
          <Field>Owner</Field>
          <Value>
            <AddressOrIdentity address={nftClass?.details?.owner} />
          </Value>
        </Row>

        <Row>
          <Field>Instance</Field>
          <Value>{nftClass?.details?.instances}</Value>
        </Row>

        <ButtonWrapper>
          <button onClick={onClose}>Close</button>
          <ColoredInterLink to={detailLink}>Detail</ColoredInterLink>
        </ButtonWrapper>
      </Wrapper>
    </MyModal>
  );
}
