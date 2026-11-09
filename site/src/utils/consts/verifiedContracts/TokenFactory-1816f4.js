import { parseAbi } from "viem";

// TokenFactory
// https://assethub-polkadot.subscan.io/account/0x1816f4b4da58680a575bdfd6b5c09f8230902af9?tab=contract
const contract = {
  name: "TokenFactory",
  abi: parseAbi([
    "function createCustomToken(string _name, string _symbol, uint8 _decimals, uint256 _totalSupply, string _description, string _logoUrl, string _website, string _github, string _twitter, string[] _projectCategories, uint256[] _buyOptions)",
    "function createDefaultToken(string _name, string _symbol)",
    "function createTokenWithBondingCurve(string _name, string _symbol, uint8 _decimals, string _description, string _logoUrl, string _website, string _github, string _twitter, string[] _projectCategories, uint256[] _buyOptions, address _secondary, uint256 _secondaryShare)",
    "function renounceOwnership()",
    "function setBondingCurveFactory(address _bondingCurveFactory)",
    "function setMigrator(address _migrator)",
    "function setTokenCreateFee(uint256 _fee)",
    "function transferOwnership(address newOwner)",
  ]),
};

export default contract;
