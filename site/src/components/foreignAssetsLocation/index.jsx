import { useState } from "react";
import styled from "styled-components";
import Popup from "../popup";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled.div`
  cursor: pointer;
`;

const LocationContent = styled.div`
  padding: 16px;
`;

const LocationItem = styled.div`
  ${Inter_14_500};
  color: var(--fontSecondary);
  margin-bottom: 8px;
  word-break: break-all;
`;

// TODO: render location content
export default function ForeignAssetsLocation({ location }) {
  const [showModal, setShowModal] = useState(false);

  const renderLocationContent = () => {
    if (!location) {
      return <LocationItem>No Data</LocationItem>;
    }

    return <LocationContent>{/* TODO */}</LocationContent>;
  };

  return (
    <>
      <Wrapper onClick={() => setShowModal(true)}>
        <img src="/imgs/icons/asset/location.svg" alt="Location" />
      </Wrapper>
      {showModal && (
        <Popup onClose={() => setShowModal(false)} title="Location">
          {renderLocationContent()}
        </Popup>
      )}
    </>
  );
}
