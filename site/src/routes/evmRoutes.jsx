import LidoDeposits from "../pages/lido/deposits";
import LidoWstETHHolders, { LidoStETHHolders } from "../pages/lido/holders";
import LidoAddress from "../pages/lido/address";
import { LidoEarnETH, LidoEarnUSD } from "../pages/lido/earn";
import LidoEarnDeposit from "../pages/lido/earnDeposit";
import LidoEarnRedeem from "../pages/lido/earnRedeem";
import LidoHome from "../pages/lido";
import LidoRewardsVault from "../pages/lido/rewardsVault";
import LidoWithdrawal from "../pages/lido/withdrawal";
import LidoWithdrawalQueue from "../pages/lido/withdrawalQueue";
import LidoWithdrawalVault from "../pages/lido/withdrawalVault";
import LidoWithdrawals from "../pages/lido/withdrawals";
import LidoWstETHWraps, { LidoWstETHUnwraps } from "../pages/lido/wstETHWraps";
import LidoStETH from "../pages/lido/stETH";
import LidoWstETH from "../pages/lido/wstETH";
import LidoNodeOperator from "../pages/lido/nodeOperator";
import LidoStaking from "../pages/lido/staking";
import LidoStakingVault from "../pages/lido/vault";
import LidoStakingVaults from "../pages/lido/vaults";
import LidoStakingModule from "../pages/lido/stakingModule";
import LidoStakingModules from "../pages/lido/stakingModules";
import LidoStakingRouterETHDepositeds from "../pages/lido/stakingRouterETHDepositeds";
import LidoTreasury, { LidoTreasuryIncome } from "../pages/lido/treasury";
import LidoLocator from "../pages/lido/locator";
import NotFound from "../pages/notFound";
import { LidoEarnProvider } from "../context/lidoEarn";
import { Route, Routes } from "react-router-dom";

function withLidoEarnProvider(element) {
  return <LidoEarnProvider>{element}</LidoEarnProvider>;
}

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LidoHome />} />
      <Route path="/addresses/:address" element={<LidoAddress />} />
      <Route path="/earn/eth" element={withLidoEarnProvider(<LidoEarnETH />)} />
      <Route path="/earn/usd" element={withLidoEarnProvider(<LidoEarnUSD />)} />
      <Route
        path="/earn/deposits/:id"
        element={withLidoEarnProvider(<LidoEarnDeposit />)}
      />
      <Route
        path="/earn/redeems/:id"
        element={withLidoEarnProvider(<LidoEarnRedeem />)}
      />
      <Route path="/steth" element={<LidoStETH />} />
      <Route path="/steth/deposits" element={<LidoDeposits />} />
      <Route path="/steth/withdrawals" element={<LidoWithdrawals />} />
      <Route path="/steth/withdrawal-queue" element={<LidoWithdrawalQueue />} />
      <Route path="/steth/holders" element={<LidoStETHHolders />} />
      <Route path="/wsteth" element={<LidoWstETH />} />
      <Route path="/wsteth/holders" element={<LidoWstETHHolders />} />
      <Route path="/wsteth/wrap" element={<LidoWstETHWraps />} />
      <Route path="/wsteth/unwrap" element={<LidoWstETHUnwraps />} />
      <Route path="/locator" element={<LidoLocator />} />
      <Route
        path="/steth/withdrawals/:requestId"
        element={<LidoWithdrawal />}
      />
      <Route path="/vaults/withdrawal" element={<LidoWithdrawalVault />} />
      <Route path="/vaults/rewards" element={<LidoRewardsVault />} />
      <Route path="/staking" element={<LidoStaking />} />
      <Route path="/staking/vaults" element={<LidoStakingVaults />} />
      <Route path="/staking/vaults/:vaultId" element={<LidoStakingVault />} />
      <Route path="/staking/modules" element={<LidoStakingModules />} />
      <Route
        path="/staking/modules/:stakingModuleId"
        element={<LidoStakingModule />}
      />
      <Route
        path="/staking/modules/:stakingModuleId/node-operators/:nodeOperatorId"
        element={<LidoNodeOperator />}
      />
      <Route
        path="/staking/deposits"
        element={<LidoStakingRouterETHDepositeds />}
      />
      <Route path="/treasury" element={<LidoTreasury />} />
      <Route path="/treasury/income" element={<LidoTreasuryIncome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
