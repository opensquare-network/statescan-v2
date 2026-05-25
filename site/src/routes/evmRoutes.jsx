import LidoDeposits from "../pages/lido/deposits";
import LidoHome from "../pages/lido";
import LidoRewardsVault from "../pages/lido/rewardsVault";
import LidoWithdrawal from "../pages/lido/withdrawal";
import LidoWithdrawalVault from "../pages/lido/withdrawalVault";
import LidoWithdrawals from "../pages/lido/withdrawals";
import LidoWstETHWraps, { LidoWstETHUnwraps } from "../pages/lido/wstETHWraps";
import LidoNodeOperator from "../pages/lido/nodeOperator";
import LidoStakingVault from "../pages/lido/vault";
import LidoStakingVaults from "../pages/lido/vaults";
import LidoStakingModule from "../pages/lido/stakingModule";
import LidoStakingModules from "../pages/lido/stakingModules";
import LidoStakingRouterETHDepositeds from "../pages/lido/stakingRouterETHDepositeds";
import NotFound from "../pages/notFound";
import { Route, Routes } from "react-router-dom";

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LidoHome />} />
      <Route path="/deposits" element={<LidoDeposits />} />
      <Route path="/withdrawals" element={<LidoWithdrawals />} />
      <Route path="/wsteth-wrap" element={<LidoWstETHWraps />} />
      <Route path="/wsteth-unwrap" element={<LidoWstETHUnwraps />} />
      <Route path="/withdrawals/:requestId" element={<LidoWithdrawal />} />
      <Route path="/withdrawal-vault" element={<LidoWithdrawalVault />} />
      <Route path="/rewards-vault" element={<LidoRewardsVault />} />
      <Route path="/staking-vaults" element={<LidoStakingVaults />} />
      <Route path="/staking-vaults/:vaultId" element={<LidoStakingVault />} />
      <Route path="/staking-modules" element={<LidoStakingModules />} />
      <Route
        path="/staking-modules/:stakingModuleId"
        element={<LidoStakingModule />}
      />
      <Route
        path="/staking-modules/:stakingModuleId/node-operators/:nodeOperatorId"
        element={<LidoNodeOperator />}
      />
      <Route
        path="/module-deposits"
        element={<LidoStakingRouterETHDepositeds />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
