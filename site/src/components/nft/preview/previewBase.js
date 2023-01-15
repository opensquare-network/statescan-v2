import { useEffect } from "react";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import NftImage from "../image/index";
import { useKeyPress } from "../../../utils/hooks/useKeyPress";
import { time } from "../../../utils/viewFuncs/time";
import AddressOrIdentity from "../../address/index";
import NftInfo from "../info";
import { ColoredInterLink } from "../../styled/link";
import InfoField from "./infoField";
import isNil from "lodash.isnil";

const MyModal = styled(Modal)`
  > div {
    box-shadow: none;
    border: none;
  }

  background-color: ${(p) => p.theme.fillBase} !important;
  padding: 24px;
`;

const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > div {
    padding: 0;
  }
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

export default function NftPreviewBase({
  open,
  indexer,
  details,
  parsedMetadata,
  detailLink,
  onClose,
}) {
  const pressEscape = useKeyPress("Escape");

  useEffect(() => {
    if (pressEscape) {
      onClose();
    }
  }, [pressEscape, onClose]);

  return (
    <MyModal open={open} size="tiny" onClose={onClose}>
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <NftImage parsedMetadata={parsedMetadata} />
      </div>

      <NftInfo
        title={parsedMetadata?.name ?? "[Unrecognized]"}
        description={parsedMetadata?.description ?? "-"}
      />

      <Divider />

      <Fields>
        <InfoField name="Created Time" value={time(indexer?.blockTime)} />
        <InfoField
          name="Owner"
          value={<AddressOrIdentity address={details?.owner} />}
        />
        {!isNil(details?.instances) && (
          <InfoField name="Instance" value={details?.instances} />
        )}
      </Fields>

      <ButtonWrapper>
        <button onClick={onClose}>Close</button>
        <ColoredInterLink to={detailLink}>Detail</ColoredInterLink>
      </ButtonWrapper>
    </MyModal>
  );
}
