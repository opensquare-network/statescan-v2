import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { Inter_12_500, Inter_14_600 } from "../../../styles/text";
import { mobilecss } from "../../../styles/responsive";
import CaretRightIcon from "../../icons/caretRightIcon";
import { useOnClickOutside } from "@osn/common";
import chains from "../../../utils/consts/chains";
import { ArrowDownIcon, Dropdown } from "../styled";

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
`;

const Options = styled.div`
  background: ${({ theme }) => theme.fillPopup};
  position: absolute;
  top: 40px;
  right: 0;
  border: 1px solid ${({ theme }) => theme.strokeBase};
  box-shadow: ${({ theme }) => theme.shadowPanel};
  border-radius: 8px;
  width: 384px;
  padding: 24px;
  z-index: 999;

  ${mobilecss(css`
    left: 0;
    width: auto;
  `)}
`;

const ChainGroupWrapper = styled.div``;

const ChainGroup = styled.div`
  margin-top: 12px;

  &:first-child {
    margin-top: 0;
  }
`;

const ChainGroupTitle = styled.h5`
  margin: 0;
  margin-bottom: 4px;
  color: ${(p) => p.theme.fontTertiary};
  ${Inter_12_500};
`;

const ChainGroupItems = styled(Flex)`
  flex-wrap: wrap;
  gap: 0 16px;
`;

const ChainGroupItemName = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  color: ${(p) => p.theme.fontPrimary};
  margin-left: 8px;
  ${Inter_14_600};
`;
const ChainGroupItemCaretWrapper = styled.span`
  display: inline-flex;
  opacity: 0;
`;
const ChainGroupItem = styled.a`
  display: inline-flex;
  padding: 8px 0;
  width: calc(50% - 8px);
  ${mobilecss(css`
    width: 100%;
  `)}
  text-decoration: none;

  &:hover {
    ${ChainGroupItemName} {
      color: ${(p) => p.theme.theme500};
    }
    ${ChainGroupItemCaretWrapper} {
      opacity: 100;
    }
  }
`;

const polkadotChains = Object.values(chains).filter(
  (i) => i.chain === "polkadot",
);
const kusamaChains = Object.values(chains).filter((i) => i.chain === "kusama");
const westendChains = Object.values(chains).filter(
  (i) => i.chain === "westend",
);
const paseoChains = Object.values(chains).filter((i) => i.chain === "paseo");
const testnetOrSoloChains = Object.values(chains).filter((i) => !i.chain);

export default function ChainSwitch() {
  const currentNode = useSelector(chainSettingSelector);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  const chainOptions = [
    {
      title: "Polkadot & Parachains",
      chains: polkadotChains,
    },
    {
      title: "Kusama & Parachains",
      chains: kusamaChains,
    },
    {
      title: "Westend Parachains",
      chains: westendChains,
    },
    testnetOrSoloChains.length > 0 && {
      title: "Solo chains & Testnet",
      chains: testnetOrSoloChains,
    },
    paseoChains.length > 0 && {
      title: "Paseo & Parachains",
      chains: paseoChains,
    },
  ].filter(Boolean);

  return (
    <Wrapper ref={ref} onClick={() => setShow((state) => !state)}>
      <Dropdown active={show}>
        <Flex>
          {currentNode.icon}
          <Text>{currentNode.name}</Text>
        </Flex>
        <ArrowDownIcon />
      </Dropdown>

      {show && (
        <Options>
          <ChainGroupWrapper>
            {chainOptions.map((chainOption) => (
              <ChainGroup key={chainOption.title}>
                <ChainGroupTitle>{chainOption.title}</ChainGroupTitle>
                <ChainGroupItems>
                  {chainOption.chains.map((chain) => {
                    const isDiffChain = chain.value !== currentNode.value;

                    const href = isDiffChain
                      ? `https://${chain.value}.statescan.io`
                      : "#/";

                    return (
                      <ChainGroupItem
                        key={chain.value}
                        href={href}
                        target={isDiffChain ? "_blank" : ""}
                      >
                        {chain.icon}
                        <ChainGroupItemName>
                          <span>{chain.name}</span>
                          <ChainGroupItemCaretWrapper>
                            <CaretRightIcon />
                          </ChainGroupItemCaretWrapper>
                        </ChainGroupItemName>
                      </ChainGroupItem>
                    );
                  })}
                </ChainGroupItems>
              </ChainGroup>
            ))}
          </ChainGroupWrapper>
        </Options>
      )}
    </Wrapper>
  );
}
