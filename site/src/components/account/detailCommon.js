import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../../store/reducers/settingSlice";
import {
  accountAssetsHead,
  extrinsicsHead,
  Assets,
  ForeignAssets,
  Extrinsics,
  Nft,
  nftClassInstanceHead,
  NftTransfer,
  nftTransfersHead,
  Transfers,
  transfersHead,
  ACCOUNT_IDENTITY_TAB_NAME,
  extrinsicsHeadSimpleMode,
} from "../../utils/constants";
import DetailTable from "../detail/table";
import {
  toAssetsTabItem,
  toExtrinsicsTabTableItem,
  toNftInstanceTransferTabTableItem,
  toTransferTabTableItem,
  toInstancesTabTableItem,
  toExtrinsicsTabTableItemSimpleMode,
} from "../../utils/viewFuncs/toTableItem";
import { clearDetailTables } from "../../store/reducers/detailTablesSlice";
import {
  accountFetchSummary,
  accountSummarySelector,
  accountAssetsCountSelector,
  setAssetsCount,
} from "../../store/reducers/accountSlice";
import DetailTabs from "../detail/tabs";
import { NftInstancePreview } from "../nft/preview/index";
import useAccountIdentity from "../accountIdentity";
import { useMultisigAddressData } from "../../hooks/multisig/useMultisigAddressData";
import AccountTabMultisig from "../accountMultisig";
import { getChainModules } from "../../utils/chain";
import { getIsSimpleMode } from "../../utils/env";
import AccountDetailRecoverablesTab from "./tabs/recoverables";
import { useRecoverablesData } from "../../hooks/recovery/useRecoverablesData";
import { useQuery } from "@apollo/client";
import {
  GET_ACCOUNT_ASSET,
  GET_ACCOUNT_ASSET_COUNT,
} from "../../services/gql/assets";
import DetailTableGraphql from "../detail/tableGraphql";
import ForeignAssetsTable from "../detail/foreignAssetsTable";
import {
  AccountForeignAssetsProvider,
  useAccountForeignAssets,
} from "./context/foreignAssetsContext";

function AccountDetailCommonInContext({ id }) {
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const { data: multisigAddressData } = useMultisigAddressData(id);
  const { multisig: hasMultisig } = getChainModules();
  const isSimpleMode = getIsSimpleMode();
  const { data: recoverables } = useRecoverablesData({ lostAccount: id });
  const { foreignAssetsCount } = useAccountForeignAssets();

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  const summary = useSelector(accountSummarySelector);
  const assetsCount = useSelector(accountAssetsCountSelector);

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const { hasIdentity, component: accountIdentity } = useAccountIdentity(id);

  const transfersApiKey = `/accounts/${id}/transfers`;
  const extrinsicsApiKey = `/accounts/${id}/extrinsics`;
  const nftInstanceApiKey = `/accounts/${id}/nft/instances`;
  const nftTransfersApiKey = `/accounts/${id}/nft/transfers`;

  const tabs = [
    {
      name: Extrinsics,
      count: summary?.extrinsicsCount,
      children: (
        <DetailTable
          url={extrinsicsApiKey}
          heads={isSimpleMode ? extrinsicsHeadSimpleMode : extrinsicsHead}
          transformData={
            isSimpleMode
              ? toExtrinsicsTabTableItemSimpleMode
              : toExtrinsicsTabTableItem
          }
        />
      ),
    },
    {
      name: Transfers,
      count: summary?.transfersCount,
      children: (
        <DetailTable
          url={transfersApiKey}
          heads={transfersHead}
          transformData={toTransferTabTableItem}
        />
      ),
    },
    chainSetting.modules?.assets && {
      name: Assets,
      count: assetsCount,
      children: (
        <DetailTableGraphql
          graphql={GET_ACCOUNT_ASSET}
          id={id}
          heads={accountAssetsHead}
          transformData={toAssetsTabItem}
        />
      ),
    },
    chainSetting.modules?.foreignAssets && {
      name: ForeignAssets,
      count: foreignAssetsCount,
      children: <ForeignAssetsTable />,
    },
    chainSetting.modules?.identity &&
      hasIdentity && {
        name: ACCOUNT_IDENTITY_TAB_NAME,
        children: accountIdentity,
      },
    chainSetting.modules?.uniques && {
      name: Nft,
      count: summary?.nftInstancesCount,
      children: (
        <DetailTable
          url={nftInstanceApiKey}
          heads={nftClassInstanceHead}
          transformData={(instances) =>
            instances?.map((instance) =>
              toInstancesTabTableItem(
                instance.class,
                instance,
                () => showPreview({ class: instance.class, instance }),
                true,
              ),
            )
          }
        />
      ),
    },
    chainSetting.modules?.uniques && {
      name: NftTransfer,
      count: summary?.nftTransfersCount,
      children: (
        <DetailTable
          url={nftTransfersApiKey}
          heads={nftTransfersHead}
          transformData={(transfers) =>
            (transfers || []).map((transfer) =>
              toNftInstanceTransferTabTableItem(
                transfer,
                transfer.class,
                transfer.instance,
                () =>
                  showPreview({
                    class: transfer.class,
                    instance: transfer.instance,
                  }),
              ),
            )
          }
        />
      ),
    },
    hasMultisig &&
      multisigAddressData?.multisigAddress && {
        name: "multisig",
        children: <AccountTabMultisig />,
      },
    chainSetting.modules?.recovery &&
      recoverables?.total && {
        name: "Recoverable",
        count: recoverables?.total,
        children: <AccountDetailRecoverablesTab />,
      },
  ].filter(Boolean);

  useEffect(() => {
    if (id) {
      dispatch(accountFetchSummary(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {chainSetting.modules?.assets && id && <DetailAssetsSummary id={id} />}
      <DetailTabs tabs={tabs} />
      <NftInstancePreview
        open={isPreview}
        nftClass={previewNft?.class}
        nftInstance={previewNft?.instance}
        onClose={() => setIsPreview(false)}
      />
    </>
  );
}

export default function AccountDetailCommon() {
  const { id } = useParams();
  return (
    <AccountForeignAssetsProvider address={id}>
      <AccountDetailCommonInContext id={id} />
    </AccountForeignAssetsProvider>
  );
}

function DetailAssetsSummary({ id }) {
  const dispatch = useDispatch();

  useQuery(GET_ACCOUNT_ASSET_COUNT, {
    variables: {
      address: id,
      offset: 0,
      limit: 1,
    },
    onCompleted: ({ accountAssets: { total } }) => {
      dispatch(setAssetsCount(total));
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(setAssetsCount(undefined));
    }
  }, [dispatch, id]);

  return null;
}
