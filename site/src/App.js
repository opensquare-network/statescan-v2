import { BrowserRouter, HashRouter } from "react-router-dom";
import DotRoutes from "./routes/dotRoutes";
import EvmRoutes from "./routes/evmRoutes";
import { isLidoProtocol } from "./utils/env";
import { useVerifiedContractsVersion } from "./context/verifiedContracts";

const Router = process.env.REACT_APP_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;

function App() {
  // Re-render the routes once the verified contracts are loaded, the decoded
  // call data and the contract names are built while rendering.
  useVerifiedContractsVersion();
  const RoutesComponent = isLidoProtocol() ? EvmRoutes : DotRoutes;

  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
}

export default App;
