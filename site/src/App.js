import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Blocks from "./pages/blocks";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blocks" element={<Blocks/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
