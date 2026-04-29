import { BrowserRouter, HashRouter } from "react-router-dom";
import DotRoutes from "./routes/dotRoutes";
import EvmRoutes from "./routes/evmRoutes";
import { isLidoProtocol } from "./utils/env";

const Router = process.env.REACT_APP_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;

function App() {
  const RoutesComponent = isLidoProtocol() ? EvmRoutes : DotRoutes;

  return (
    <Router>
      <RoutesComponent />
    </Router>
  );
}

export default App;
