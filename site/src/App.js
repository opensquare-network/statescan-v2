import { HashRouter, Routes, Route } from "react-router-dom";
import Extrinsics from "./pages/extrinsics";
import Blocks from "./pages/blocks";
import Home from "./pages/index";
import Block from "./pages/block";
import Events from "./pages/events";
import Extrinsic from "./pages/extrinsic";
import Transfers from "./pages/transfers";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/block/:id" element={<Block />} />
        <Route path="/extrinsics" element={<Extrinsics />} />
        <Route path="/extrinsic/:id" element={<Extrinsic />} />
        <Route path="/events" element={<Events />} />
        <Route path="/transfers" element={<Transfers />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
