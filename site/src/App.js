import { HashRouter, Routes, Route } from "react-router-dom";
import Extrinsics from "./pages/extrinsics";
import Blocks from "./pages/blocks";
import Home from "./pages/index";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/extrinsics" element={<Extrinsics />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
