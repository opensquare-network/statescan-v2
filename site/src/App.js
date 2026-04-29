import { BrowserRouter, HashRouter } from "react-router-dom";
import DotRoutes from "./routes/dotRoutes";
import EvmRoutes from "./routes/evmRoutes";
import { getEnvChain } from "./utils/env";

const Router = process.env.REACT_APP_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;

function App() {
  const RoutesComponent = getEnvChain() === "lido" ? EvmRoutes : DotRoutes;

  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
}

export default App;
