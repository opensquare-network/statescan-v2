import { useState } from "react";
import styled from "styled-components";
import Popup from "../popup";
import ForeignAssetLocationContent from "./foreignAssetLocationContent";

const Wrapper = styled.div`
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 -24px;
`;

export default function ForeignAssetsLocation({ location }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setShowModal(true)}>
        <img src="/imgs/icons/asset/location.svg" alt="Location" />
      </Wrapper>
      {showModal && (
        <Popup
          onClose={() => setShowModal(false)}
          title="Location"
          popupStyle={{ paddingBottom: 0 }}
        >
          <ContentWrapper>
            <ForeignAssetLocationContent
              location={location}
              style={{ width: "100%", borderRadius: "0 0 4px 4px" }}
            />
          </ContentWrapper>
        </Popup>
      )}
    </>
  );
}
