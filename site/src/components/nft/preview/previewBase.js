import { useEffect } from "react";
import styled from "styled-components";
import isNil from "lodash.isnil";
import NftImage from "../image/index";
import { useKeyPress } from "../../../utils/hooks/useKeyPress";
import { time } from "../../../utils/viewFuncs/time";
import AddressOrIdentity from "../../address/index";
import NftInfo from "../info";
import InfoField from "./infoField";
import Modal from "../../modal";
import { flex, flex_1, gap, m_t, w_full } from "../../../styles/tailwindcss";
import { PanelButton, Button } from "../../styled/buttons";
import { useNavigate } from "react-router-dom";

const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > div {
    padding: 0;
  }
`;

const ButtonGroup = styled.div`
  ${flex};
  ${w_full};
  ${gap(16)};
  ${m_t(8)};

  ${PanelButton},
  ${Button} {
    ${flex_1};
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
  const navigate = useNavigate();

  useEffect(() => {
    if (pressEscape) {
      onClose();
    }
  }, [pressEscape, onClose]);

  const instances = details?.items ?? details?.instances;

  return (
    <Modal open={open} onClose={onClose}>
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
        {!isNil(instances) && <InfoField name="Instance" value={instances} />}
      </Fields>

      <ButtonGroup>
        <PanelButton onClick={onClose}>Close</PanelButton>
        <Button onClick={() => navigate(detailLink)}>Detail</Button>
      </ButtonGroup>
    </Modal>
  );
}
