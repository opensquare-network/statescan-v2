import LidoDeposits from "../pages/lido/deposits";
import LidoHome from "../pages/lido";
import LidoWithdrawal from "../pages/lido/withdrawal";
import LidoWithdrawals from "../pages/lido/withdrawals";
import NotFound from "../pages/notFound";
import { Route, Routes } from "react-router-dom";

export default function EvmRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LidoHome />} />
      <Route path="/deposits" element={<LidoDeposits />} />
      <Route path="/withdrawals" element={<LidoWithdrawals />} />
      <Route path="/withdrawals/:requestId" element={<LidoWithdrawal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
