import LidoDeposits from "../pages/lido/deposits";
import LidoHome from "../pages/lido";
import LidoRewardsVault from "../pages/lido/rewardsVault";
import LidoWithdrawal from "../pages/lido/withdrawal";
import LidoWithdrawalVault from "../pages/lido/withdrawalVault";
import LidoWithdrawals from "../pages/lido/withdrawals";
import LidoStakingVault from "../pages/lido/vault";
import LidoStakingVaults from "../pages/lido/vaults";
import NotFound from "../pages/notFound";
import { Route, Routes } from "react-router-dom";

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LidoHome />} />
      <Route path="/deposits" element={<LidoDeposits />} />
      <Route path="/withdrawals" element={<LidoWithdrawals />} />
      <Route path="/withdrawals/:requestId" element={<LidoWithdrawal />} />
      <Route path="/withdrawal-vault" element={<LidoWithdrawalVault />} />
      <Route path="/rewards-vault" element={<LidoRewardsVault />} />
      <Route path="/staking-vaults" element={<LidoStakingVaults />} />
      <Route path="/staking-vaults/:vaultId" element={<LidoStakingVault />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
