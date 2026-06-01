import LidoDeposits from "../pages/lido/deposits";
import LidoWstETHHolders, { LidoStETHHolders } from "../pages/lido/holders";
import LidoAddress from "../pages/lido/address";
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
import LidoStakingVault from "../pages/lido/vault";
import LidoStakingVaults from "../pages/lido/vaults";
import LidoStakingModule from "../pages/lido/stakingModule";
import LidoStakingModules from "../pages/lido/stakingModules";
import LidoStakingRouterETHDepositeds from "../pages/lido/stakingRouterETHDepositeds";
import LidoLocator from "../pages/lido/locator";
import NotFound from "../pages/notFound";
import { Route, Routes } from "react-router-dom";

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LidoHome />} />
      <Route path="/addresses/:address" element={<LidoAddress />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
