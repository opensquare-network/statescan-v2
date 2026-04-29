import { Navigate, Route, Routes } from "react-router-dom";
import LidoDeposits from "../pages/lido/deposits";
import LidoWithdrawal from "../pages/lido/withdrawal";
import LidoWithdrawals from "../pages/lido/withdrawals";
import NotFound from "../pages/notFound";

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/deposits" replace />} />
      <Route path="/deposits" element={<LidoDeposits />} />
      <Route path="/withdrawals" element={<LidoWithdrawals />} />
      <Route path="/withdrawals/:requestId" element={<LidoWithdrawal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
