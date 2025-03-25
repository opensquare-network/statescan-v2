import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import noop from "lodash.noop";
import styled from "styled-components";
import PopupContainer from "./container";

const Panel = styled.div`
  position: relative;
  margin-top: 12vh;
  margin-bottom: 16px;
  width: 640px;
  max-width: 100%;
  padding: 24px;
  background: var(--fillPanel);
  border: 1px solid var(--strokeBase);
  box-shadow: var(--shadowPanel);
  border-radius: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: var(--fontPrimary);
  margin: 0;
`;

const ExtraWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseIcon = styled.img`
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin-top: 16px;
`;

let z = 999;

export default function Popup({
  onClose = noop,
  title,
  className = "",
  extra,
  maskClosable = true,
  children,
  container,
  showCloseIcon = true,
}) {
  const [zOverlay] = useState(z);
  const [zContent] = useState(z + 1);
  useEffect(() => {
    z++;
  }, []);

  return (
    <Dialog.Root open>
      <Dialog.Portal container={container}>
        <Dialog.Overlay />
        <Dialog.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
          <PopupContainer
            style={{ zIndex: zOverlay }}
            onMouseDown={(event) => {
              if (maskClosable && event.target === event.currentTarget) {
                onClose();
              }
            }}
          >
            <Panel
              className={className}
              style={{
                zIndex: zContent,
              }}
            >
              {title && (
                <TitleWrapper>
                  <Dialog.Title asChild>
                    <Title>{title}</Title>
                  </Dialog.Title>
                  <ExtraWrapper>
                    {extra}
                    {showCloseIcon && (
                      <CloseIcon
                        src="/imgs/icons/close.svg"
                        role="button"
                        onClick={onClose}
                        alt="close"
                      />
                    )}
                  </ExtraWrapper>
                </TitleWrapper>
              )}

              <ContentWrapper>{children}</ContentWrapper>
            </Panel>
          </PopupContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
