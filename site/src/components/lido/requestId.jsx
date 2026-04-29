import { LidoEtherscanLinkWithCopy } from "./etherscanLink";

const LIDO_WITHDRAWAL_QUEUE_ADDRESS =
  "0x889edc2edab5f40e902b864ad4d7ade8e412f9b1";

function getEtherscanRequestIdUrl(requestId) {
  return `https://etherscan.io/nft/${LIDO_WITHDRAWAL_QUEUE_ADDRESS}/${requestId}`;
}

export default function LidoRequestId({ requestId }) {
  if (!requestId) {
    return "--";
  }

  return (
    <LidoEtherscanLinkWithCopy href={getEtherscanRequestIdUrl(requestId)}>
      {requestId}
    </LidoEtherscanLinkWithCopy>
  );
}
