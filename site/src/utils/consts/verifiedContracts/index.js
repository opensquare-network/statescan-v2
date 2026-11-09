// Generated from the verified contracts of
// https://assethub-polkadot.subscan.io/contract_list?verified=true
// (contract ABIs read from https://blockscout.polkadot.io).
//
// Only state changing functions are kept: view/pure calls never appear in an
// extrinsic. Proxy entries are keyed by the proxy address and carry the ABI of
// their implementation. Contracts without any state changing function (verifiers,
// encoders, view helpers, proxies with an unverified implementation) are omitted.
import intrinsicModule_022a16 from "./IntrinsicModule-022a16";
import creatorFeeVault_11f2b6 from "./CreatorFeeVault-11f2b6";
import intentGatewayV2_16f9e5 from "./IntentGatewayV2-16f9e5";
import tokenFactory_1816f4 from "./TokenFactory-1816f4";
import referralStorage_1da550 from "./ReferralStorage-1da550";
import feeConfig_1e69d2 from "./FeeConfig-1e69d2";
import fissionCore_208c30 from "./FissionCore-208c30";
import fissionAMM_242f0f from "./FissionAMM-242f0f";
import metadataRegistry_251cf7 from "./MetadataRegistry-251cf7";
import handlerV2_2a18ab from "./HandlerV2-2a18ab";
import verificationDemo_2ab3a5 from "./VerificationDemo-2ab3a5";
import protocolFeeCollector_35ea07 from "./ProtocolFeeCollector-35ea07";
import solverAccount_3bdb53 from "./SolverAccount-3bdb53";
import protocolParams_4960a7 from "./ProtocolParams-4960a7";
import quoteTokenRegistry_4cbef0 from "./QuoteTokenRegistry-4cbef0";
import quoteTokenRegistry_4cc767 from "./QuoteTokenRegistry-4cc767";
import pets_538f4c from "./Pets-538f4c";
import hostManager_59185d from "./HostManager-59185d";
import plazaSwapV2Factory_59bff7 from "./PlazaSwapV2Factory-59bff7";
import fissionAMM_5ce399 from "./FissionAMM-5ce399";
import policyManager_5edaf9 from "./PolicyManager-5edaf9";
import referralStorage_60da66 from "./ReferralStorage-60da66";
import evmHost_620128 from "./EvmHost-620128";
import bandwidthManager_6a6753 from "./BandwidthManager-6a6753";
import assetHubNominationPoolAdapterRouter_6de915 from "./AssetHubNominationPoolAdapterRouter-6de915";
import launcherRegistry_7420d3 from "./LauncherRegistry-7420d3";
import vibeRouter_7532b2 from "./VibeRouter-7532b2";
import feeKeyNFT_7729ea from "./FeeKeyNFT-7729ea";
import solverAccount_7cb555 from "./SolverAccount-7cb555";
import timelockController_80c8b6 from "./TimelockController-80c8b6";
import dOT5050_8e46a5 from "./DOT5050-8e46a5";
import intentGatewayV2_8e6c93 from "./IntentGatewayV2-8e6c93";
import omniBondingCurve_93afe9 from "./OmniBondingCurve-93afe9";
import graduationManager_96326e from "./GraduationManager-96326e";
import intentGatewayV2_976b26 from "./IntentGatewayV2-976b26";
import positionStakingAccountFactory_99b6fe from "./PositionStakingAccountFactory-99b6fe";
import mockAUSDT_9b0a46 from "./MockAUSDT-9b0a46";
import market_9c0659 from "./Market-9c0659";
import mockVDOT_9c1af3 from "./MockVDOT-9c1af3";
import intentGatewayV2_9d82b0 from "./IntentGatewayV2-9d82b0";
import plazaSwapV2DirectAdapter_a7a52b from "./PlazaSwapV2DirectAdapter-a7a52b";
import graduationManager_ab14f1 from "./GraduationManager-ab14f1";
import intentGatewayV2_ae041f from "./IntentGatewayV2-ae041f";
import wrappedDOT_af905e from "./WrappedDOT-af905e";
import xC20_b219ec from "./XC20-b219ec";
import rewardLiquidityPool_b77f65 from "./RewardLiquidityPool-b77f65";
import solverAccount_b92a51 from "./SolverAccount-b92a51";
import soneVibeWrappedXC20_bee14a from "./SoneVibeWrappedXC20-bee14a";
import hostManager_c09a82 from "./HostManager-c09a82";
import protocolParams_c20fda from "./ProtocolParams-c20fda";
import assetHubNominationPoolAdapterRouter_c3f250 from "./AssetHubNominationPoolAdapterRouter-c3f250";
import advanceVaultInstantModule_c5576b from "./AdvanceVaultInstantModule-c5576b";
import vibeFactory_ce4a76 from "./VibeFactory-ce4a76";
import dotRewardAdvanceVault_d1b779 from "./DotRewardAdvanceVault-d1b779";
import vibePair_d1ca19 from "./VibePair-d1ca19";
import dOTAGENT5050_d7a172 from "./DOTAGENT5050-d7a172";
import metadataRegistry_d96787 from "./MetadataRegistry-d96787";
import dottic_de3852 from "./Dottic-de3852";
import moksaFeeCollector_ded794 from "./MoksaFeeCollector-ded794";
import fissionRouter_df6122 from "./FissionRouter-df6122";
import callDispatcher_e2c7e5 from "./CallDispatcher-e2c7e5";
import plazaSwapV2Router_e9a010 from "./PlazaSwapV2Router-e9a010";
import advanceVaultWithdrawalModule_ec00b3 from "./AdvanceVaultWithdrawalModule-ec00b3";
import advanceVaultFeatureModule_ede432 from "./AdvanceVaultFeatureModule-ede432";
import creatorFeeVault_ef7527 from "./CreatorFeeVault-ef7527";
import wETH9_f90c1c from "./WETH9-f90c1c";
import dotRewardAdvanceVault_f976ec from "./DotRewardAdvanceVault-f976ec";
import rewardLiquidityPool_fb5171 from "./RewardLiquidityPool-fb5171";
import advanceVaultInstantModule_fc632b from "./AdvanceVaultInstantModule-fc632b";
import solverAccount_fcd233 from "./SolverAccount-fcd233";

export const VERIFIED_CONTRACTS = {
  "0x022a168d64d85007ed8c7f08a672fd997e0c4bdd": intrinsicModule_022a16,
  "0x11f2b65e6e977c06b6c45cecaf504cb04fa04461": creatorFeeVault_11f2b6,
  "0x16f9e57f735bbff9f6c4e5276330f9c437d0e9e0": intentGatewayV2_16f9e5,
  "0x1816f4b4da58680a575bdfd6b5c09f8230902af9": tokenFactory_1816f4,
  "0x1da550fb425e381319a32585959dd0807374af45": referralStorage_1da550,
  "0x1e69d281e28f43f14aace7d494ad5b244ce8da9b": feeConfig_1e69d2,
  "0x208c305f9d1794461d7069be1003e7e979c38e3f": fissionCore_208c30,
  "0x242f0f2536cdff40b0cbf802032715272929e474": fissionAMM_242f0f,
  "0x251cf704adbbe54050bfe5612635ea85966d3341": metadataRegistry_251cf7,
  "0x2a18ab35dea43474882e05a661e2f20fe89c0535": handlerV2_2a18ab,
  "0x2ab3a5f78ba011fb3d37cc884893a44be57ce26e": verificationDemo_2ab3a5,
  "0x35ea07af915f1ae154e4ec01197122eb7063afed": protocolFeeCollector_35ea07,
  "0x3bdb532d91f165befad5542700205f5bb5152a82": solverAccount_3bdb53,
  "0x4960a7bee233d439d64ec4023a10f259c83f5e78": protocolParams_4960a7,
  "0x4cbef06615185da6eba406a6ca6866b73b84fc7e": quoteTokenRegistry_4cbef0,
  "0x4cc767fb7263c1dbe4ea5d28b34e6a4426330fc1": quoteTokenRegistry_4cc767,
  "0x538f4c0dbb9c1b5582b64622844eb0c3c4c35974": pets_538f4c,
  "0x59185dac59b2e0ade6a414964d039b0474d942c0": hostManager_59185d,
  "0x59bff7157f15feaf4a0f0dc684224b7c3832fe8d": plazaSwapV2Factory_59bff7,
  "0x5ce39982b73ba6ba21d5b649ce61a283615f4a4e": fissionAMM_5ce399,
  "0x5edaf928c94a249c5ce1eabad0fe799cd294f345": policyManager_5edaf9,
  "0x60da66c98d82e729c016361ce5024be6f010286b": referralStorage_60da66,
  "0x620128e2b19193d6bd244a3ac8d3bba0541b19c3": evmHost_620128,
  "0x6a67533ce73756ffab17c05578a5fbba5d9b2d8d": bandwidthManager_6a6753,
  "0x6de915f94575605dfa4d5ab150d3a4ece2c54ced":
    assetHubNominationPoolAdapterRouter_6de915,
  "0x7420d3da081d32645bef5763801ba0045bcb7efe": launcherRegistry_7420d3,
  "0x7532b23dfb30ac22b2a74e3b81cc288de19379ba": vibeRouter_7532b2,
  "0x7729eaad7719c16ba97cfd273e98c307ef55697a": feeKeyNFT_7729ea,
  "0x7cb55539d1144f62422099c3fa3405092022c88c": solverAccount_7cb555,
  "0x80c8b6ea4c9ec77735f89070e74c69222e04bdff": timelockController_80c8b6,
  "0x8e46a5aa2bd9626da5f0439b69214d7a8e7ccd39": dOT5050_8e46a5,
  "0x8e6c939e4915960eda307c28f1d14840472f2648": intentGatewayV2_8e6c93,
  "0x93afe9ac0bdaac89a7045e5451b3de6d3f1210d6": omniBondingCurve_93afe9,
  "0x96326ee2fac239f98f2a256e993c223f9d0b3c0b": graduationManager_96326e,
  "0x976b268b06f545c4a2bf44866aa2465bd8b3c67d": intentGatewayV2_976b26,
  "0x99b6fea482c86bf5a196222f9c82185bcd6c3377":
    positionStakingAccountFactory_99b6fe,
  "0x9b0a46e35fb743ed366077ce16c497efeed37e2f": mockAUSDT_9b0a46,
  "0x9c06597354326d7f421222ca81363cc848b87132": market_9c0659,
  "0x9c1af3d3741542019f3a3c6c33ed3638db07a18b": mockVDOT_9c1af3,
  "0x9d82b05156d0da273d66c5ccbdccef2b00ee06a7": intentGatewayV2_9d82b0,
  "0xa7a52b6b37c234c2e2c8005e2f61aec9f8c90dbd": plazaSwapV2DirectAdapter_a7a52b,
  "0xab14f149ef37911d6ff6ab82be9d973bf444dcce": graduationManager_ab14f1,
  "0xae041f7b0cb581876832830baeb6a2aa2a3c9716": intentGatewayV2_ae041f,
  "0xaf905e66038ece89e03d843b35a11d262053b630": wrappedDOT_af905e,
  "0xb219ec1c08ae8987018ecc2fbf8669d11c047a20": xC20_b219ec,
  "0xb77f65fdabe4689236a13335acac634641826bf5": rewardLiquidityPool_b77f65,
  "0xb92a51a609e85f8316004a6da9feab4421c01b43": solverAccount_b92a51,
  "0xbee14ad0949ebb63b90e04b8fd0a78af2f0f3354": soneVibeWrappedXC20_bee14a,
  "0xc09a8229e2c18dead6a2795154d7d8c7f1ac5dfa": hostManager_c09a82,
  "0xc20fdad59e0c618be7c95dbf1834a185b783f2b4": protocolParams_c20fda,
  "0xc3f2508c50134e62f1c8078763a6547d3793204c":
    assetHubNominationPoolAdapterRouter_c3f250,
  "0xc5576bce6fc5042317d67f91f61b9b0c9379db8f":
    advanceVaultInstantModule_c5576b,
  "0xce4a761e8673928e40f9c573777590b7d7e2212d": vibeFactory_ce4a76,
  "0xd1b7793ec1a1ba2599c05f7b56d0a7c3c74c8e7b": dotRewardAdvanceVault_d1b779,
  "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2": vibePair_d1ca19,
  "0xd7a1723bfb5c0b0d04a0378e1a2f279a71051f94": dOTAGENT5050_d7a172,
  "0xd967872f1ee5e233cfe1a2ded4ec4a3c922b21e5": metadataRegistry_d96787,
  "0xde3852d8db2a59811b2a09a5b5a3d4ea09860c58": dottic_de3852,
  "0xded7941041e6adc44c86cf3331eb2bf867084096": moksaFeeCollector_ded794,
  "0xdf6122cf64847e43ecc2efa2f1eefd914a2d5c5d": fissionRouter_df6122,
  "0xe2c7e576e26e0be7ac97c6fe925bcdabd87c4bed": callDispatcher_e2c7e5,
  "0xe9a010fbcfe51942b8e2caf7729c9f63541faf3d": plazaSwapV2Router_e9a010,
  "0xec00b3aa9f9254b7af7e6de1d7244d978fabed65":
    advanceVaultWithdrawalModule_ec00b3,
  "0xede43265475f20e48ed5ab924aa115bb76258162":
    advanceVaultFeatureModule_ede432,
  "0xef75274c4fe529b5a9edb73e471aac148e89a251": creatorFeeVault_ef7527,
  "0xf90c1c9529a73f9c33f08e41c5611fa483ba2721": wETH9_f90c1c,
  "0xf976ec6caf0a6a1bcb819adf2b15b83811db0eba": dotRewardAdvanceVault_f976ec,
  "0xfb5171d0462bee96251008879cfb1af5da742561": rewardLiquidityPool_fb5171,
  "0xfc632bef75f2ebfb5a8f1e201895e07cc4689b88":
    advanceVaultInstantModule_fc632b,
  "0xfcd233b937d7622aac63ced3c9a1a12f4a6b64e3": solverAccount_fcd233,
};
