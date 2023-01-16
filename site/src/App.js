import { HashRouter, Route, Routes } from "react-router-dom";
import Extrinsics from "./pages/extrinsics";
import Blocks from "./pages/blocks";
import Home from "./pages";
import Block from "./pages/block";
import Events from "./pages/events";
import Extrinsic from "./pages/extrinsic";
import Transfers from "./pages/transfers";
import Accounts from "./pages/accounts";
import Event from "./pages/event";
import Account from "./pages/account";
import Calls from "./pages/calls";
import Call from "./pages/call";
import NotFound from "./pages/notFound";
import Assets from "./pages/assets";
import { Fragment } from "react";
import Asset from "./pages/asset";
import { getChainModules } from "./utils/chain";
import Nfts from "./pages/nfts";
import DestroyedAssets from "./pages/destroyed/assets";
import NftClass from "./pages/nftClass";

function App() {
  const { assets, uniques } = getChainModules();

  return (
    <HashRouter>
      <Routes>
        {assets && (
          <Fragment>
            <Route path="/assets" element={<Assets />} />
            <Route path="/asset/:assetId" element={<Asset />} />
            <Route path="/destroyed/assets" element={<DestroyedAssets />} />
          </Fragment>
        )}
        {uniques && (
          <Fragment>
            <Route path="/nfts" element={<Nfts />} />
            <Route path="/nft/class/:classId" element={<NftClass />} />
          </Fragment>
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/block/:id" element={<Block />} />
        <Route path="/extrinsics" element={<Extrinsics />} />
        <Route path="/extrinsic/:id" element={<Extrinsic />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/call/:id" element={<Call />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
