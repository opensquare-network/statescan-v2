import { parseAbi } from "viem";

// DOT5050
// https://assethub-polkadot.subscan.io/account/0x8e46a5aa2bd9626da5f0439b69214d7a8e7ccd39?tab=contract
const contract = {
  name: "DOT5050",
  abi: parseAbi([
    "function approve(address to, uint256 tokenId)",
    "function buyTickets(uint256 _raffleId, uint256 _quantity)",
    "function cancelRaffle(uint256 _raffleId)",
    "function completeRaffle(uint256 _raffleId)",
    "function createRaffle(uint256 _tokenId, string _title, string _description, string _image, uint256 _ticketSupply, uint256 _startTime, uint256 _endTime)",
    "function emergencyUnlockNFT(uint256 _tokenId, uint256 _raffleId)",
    "function mint(uint256 _quantity)",
    "function ownerMint(address _to, uint256 _quantity)",
    "function renounceOwnership()",
    "function safeTransferFrom(address from, address to, uint256 tokenId)",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
    "function setApprovalForAll(address operator, bool approved)",
    "function setBaseURI(string _newBaseURI)",
    "function setMintingActive(bool _active)",
    "function setNotRevealedURI(string _notRevealedURI)",
    "function setRevealed(bool _revealed)",
    "function transferFrom(address from, address to, uint256 tokenId)",
    "function transferOwnership(address newOwner)",
    "function withdraw()",
  ]),
};

export default contract;
