import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
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
import { getChainModules, getIsUseOnChainBlockData } from "./utils/chain";
import Nfts from "./pages/nfts";
import DestroyedAssets from "./pages/destroyed/assets";
import NftClass from "./pages/nftClass";
import NftInstance from "./pages/nftInstance";
import DestroyedNfts from "./pages/destroyed/nfts";
import IdentitiesPage from "./pages/identities";
import RegistrarsPage from "./pages/registrars";
import RequestsPage from "./pages/requests";
import useSubFinalizedHeight from "./hooks/useFinalizedHeight";
import OnChainBlock from "./pages/onChainBlock";
import OnChainAccount from "./pages/onChainAccount";
import OnChainEvent from "./pages/onChainEvent";
import MultisigsPage from "./pages/multisigs";
import MultisigAccountsPage from "./pages/multisigAccounts";
import MultisigPage from "./pages/multisig";
import useConnectApis from "./utils/hooks/chain/apis/useConnectApis";
import useUpdateNodesDelay from "./utils/hooks/useUpdateNodesDelay";
import { VestingsPage } from "./pages/vestings";
import RecoverablesPage from "./pages/recoverables";
import RecoveriesPage from "./pages/recoveries";
import RecoverablePage from "./pages/recoverable";
import RecoveryPage from "./pages/recovery";
import ProxiesPage from "./pages/proxies";
import ProxyPage from "./pages/proxy";
import ProxyDetailPage from "./pages/proxy/detail";

const Router = process.env.REACT_APP_BROWSER_ROUTER
  ? BrowserRouter
  : HashRouter;

function App() {
  const { assets, uniques, identity, multisig, vestings, recovery, proxy } =
    getChainModules();
  const isUseOnChainBlockData = getIsUseOnChainBlockData();
  useSubFinalizedHeight();
  useConnectApis();
  useUpdateNodesDelay();

  return (
    <Router>
      <Routes>
        {assets && (
          <Fragment>
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:assetId" element={<Asset />} />
            <Route path="/destroyed/assets" element={<DestroyedAssets />} />
          </Fragment>
        )}
        {uniques && (
          <Fragment>
            <Route path="/uniques" element={<Nfts />} />
            <Route path="/uniques/classes/:classId" element={<NftClass />} />
            <Route
              path="/uniques/classes/:classId/instances/:instanceId"
              element={<NftInstance />}
            />
            <Route path="/destroyed/uniques" element={<DestroyedNfts />} />
          </Fragment>
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route
          path="/blocks/:id"
          element={isUseOnChainBlockData ? <OnChainBlock /> : <Block />}
        />
        <Route path="/extrinsics" element={<Extrinsics />} />
        <Route path="/extrinsics/:id" element={<Extrinsic />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/events/:id"
          element={isUseOnChainBlockData ? <OnChainEvent /> : <Event />}
        />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route
          path="/accounts/:id"
          element={isUseOnChainBlockData ? <OnChainAccount /> : <Account />}
        />
        <Route path="/calls" element={<Calls />} />
        <Route path="/calls/:id" element={<Call />} />
        {identity && (
          <>
            <Route path="/identities" element={<IdentitiesPage />} />
            <Route path="/identities/judgements" element={<RequestsPage />} />
            <Route path="/identities/registrars" element={<RegistrarsPage />} />
          </>
        )}
        {multisig && (
          <>
            <Route path="/multisigs" element={<MultisigsPage />} />
            <Route path="/multisigs/:id" element={<MultisigPage />} />
            <Route
              path="/multisig/accounts"
              element={<MultisigAccountsPage />}
            />
          </>
        )}
        {vestings && (
          <>
            <Route path="/vestings" element={<VestingsPage />} />
          </>
        )}
        {recovery && (
          <>
            <Route path="/recoverables" element={<RecoverablesPage />} />
            <Route path="/recoverables/:id" element={<RecoverablePage />} />
            <Route path="/recoveries" element={<RecoveriesPage />} />
            <Route path="/recoveries/:id" element={<RecoveryPage />} />
            <Route path="/proxies" element={<ProxiesPage />} />
          </>
        )}
        {proxy && (
          <>
            <Route path="/proxy" element={<ProxyPage />} />
            <Route path="/proxy/:id" element={<ProxyDetailPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
