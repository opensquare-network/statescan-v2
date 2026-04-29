import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "../pages/account";
import Accounts from "../pages/accounts";
import Asset from "../pages/asset";
import Assets from "../pages/assets";
import Block from "../pages/block";
import Blocks from "../pages/blocks";
import Call from "../pages/call";
import Calls from "../pages/calls";
import DestroyedAssets from "../pages/destroyed/assets";
import DestroyedNfts from "../pages/destroyed/nfts";
import Event from "../pages/event";
import Events from "../pages/events";
import Extrinsic from "../pages/extrinsic/extrinsic";
import OnChainExtrinsic from "../pages/extrinsic/onChainExtrinsic";
import Extrinsics from "../pages/extrinsics";
import ForeignAsset from "../pages/foreignAsset";
import ForeignAssets from "../pages/foreignAssets";
import Home from "../pages";
import IdentitiesPage from "../pages/identities";
import MultisigPage from "../pages/multisig";
import MultisigAccountsPage from "../pages/multisigAccounts";
import MultisigsPage from "../pages/multisigs";
import NftClass from "../pages/nftClass";
import NftInstance from "../pages/nftInstance";
import Nfts from "../pages/nfts";
import NotFound from "../pages/notFound";
import OnChainAccount from "../pages/onChainAccount";
import OnChainBlock from "../pages/onChainBlock";
import OnChainEvent from "../pages/onChainEvent";
import ProxiesPage from "../pages/proxies";
import ProxyPage from "../pages/proxy";
import ProxyAnnouncementDetailPage from "../pages/proxy/announcement";
import ProxyDetailPage from "../pages/proxy/detail";
import RecoverablePage from "../pages/recoverable";
import RecoverablesPage from "../pages/recoverables";
import RecoveryPage from "../pages/recovery";
import RecoveriesPage from "../pages/recoveries";
import RegistrarsPage from "../pages/registrars";
import RequestsPage from "../pages/requests";
import StakingValidators from "../pages/staking/validators";
import Transfers from "../pages/transfers";
import TXPage from "../pages/tx";
import { VestingsPage } from "../pages/vestings";
import useSetFinalizedHeight from "../hooks/useSetFinalizedHeight";
import { getChainModules, getIsUseOnChainBlockData } from "../utils/chain";
import useConnectApis from "../utils/hooks/chain/apis/useConnectApis";
import useUpdateNodesDelay from "../utils/hooks/useUpdateNodesDelay";

export default function DotRoutes() {
  const {
    assets,
    foreignAssets,
    uniques,
    identity,
    multisig,
    staking,
    vestings,
    recovery,
    proxy,
    tx,
  } = getChainModules();
  const isUseOnChainBlockData = getIsUseOnChainBlockData();
  useConnectApis();
  useUpdateNodesDelay();
  useSetFinalizedHeight();

  return (
    <Routes>
      {assets && (
        <Fragment>
          <Route path="/assets" element={<Assets />} />
          <Route path="/assets/:assetId" element={<Asset />} />
          <Route path="/destroyed/assets" element={<DestroyedAssets />} />
        </Fragment>
      )}
      {foreignAssets && (
        <Fragment>
          <Route path="/foreign-assets" element={<ForeignAssets />} />
          <Route path="/foreign-assets/:assetId" element={<ForeignAsset />} />
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
      <Route
        path="/extrinsics/:id"
        element={isUseOnChainBlockData ? <OnChainExtrinsic /> : <Extrinsic />}
      />
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
          <Route path="/multisig/accounts" element={<MultisigAccountsPage />} />
        </>
      )}
      {staking?.validators && (
        <>
          <Route path="/staking/validators" element={<StakingValidators />} />
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
          <Route
            path="/proxy/announcements/:id"
            element={<ProxyAnnouncementDetailPage />}
          />
        </>
      )}
      {tx && (
        <>
          <Route path="/tx/:id" element={<TXPage />} />
        </>
      )}
    </Routes>
  );
}
