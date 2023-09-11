import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import DetailLayout from "../components/layout/detailLayout";
import {
  accountAssetsHead,
  extrinsicsHead,
  Assets,
  Extrinsics,
  Nft,
  nftClassInstanceHead,
  NftTransfer,
  nftTransfersHead,
  Transfers,
  transfersHead,
  ACCOUNT_IDENTITY_TAB_NAME,
} from "../utils/constants";
import DetailTable from "../components/detail/table";
import {
  toAssetsTabItem,
  toExtrinsicsTabTableItem,
  toNftInstanceTransferTabTableItem,
  toTransferTabTableItem,
  toInstancesTabTableItem,
} from "../utils/viewFuncs/toTableItem";
import { clearDetailTables } from "../store/reducers/detailTablesSlice";
import {
  accountFetchDetail,
  accountFetchSummary,
  accountSummarySelector,
  clearAccountDetail,
} from "../store/reducers/accountSlice";
import DetailTabs from "../components/detail/tabs";
import { NftInstancePreview } from "../components/nft/preview/index";
import useAchainableProfile from "../hooks/useAchainableProfile";
import useAccountIdentity from "../components/accountIdentity";
import useOnChainAccountData from "../hooks/useOnChainAccountData";
import useAccountInfo from "../hooks/useAccountInfo";
import { toOnChainAccountDetailItem } from "../utils/viewFuncs/toDetailItem";

function OnChainAccount() {
  const { id } = useParams();
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const achainableProfile = useAchainableProfile(id);

  const accountData = useOnChainAccountData(id);
  const accountInfo = useAccountInfo(accountData);
  window.console.log({
    accountData,
    accountInfo,
  });

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  const summary = useSelector(accountSummarySelector);

  const detail = useMemo(() => {
    if (!accountInfo) {
      return null;
    }
    return {
      address: id,
      ...accountInfo,
      extrinsicsCount: summary?.extrinsicsCount || 0,
      transfersCount: summary?.transfersCount || 0,
    };
  }, [accountInfo, id, summary]);

  const listData = useMemo(() => {
    if (!detail) {
      return {};
    }
    return toOnChainAccountDetailItem(
      id,
      detail,
      chainSetting,
      achainableProfile,
    );
  }, [id, detail, chainSetting, achainableProfile]);

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const { hasIdentity, component: accountIdentity } = useAccountIdentity(id);

  const assetsApiKey = `/accounts/${id}/assets`;
  const transfersApiKey = `/accounts/${id}/transfers`;
  const extrinsicsApiKey = `/accounts/${id}/extrinsics`;
  const nftInstanceApiKey = `/accounts/${id}/nft/instances`;
  const nftTransfersApiKey = `/accounts/${id}/nft/transfers`;

  const tabs = [
    chainSetting.modules?.assets && {
      name: Assets,
      count: summary?.assetsCount,
      children: (
        <DetailTable
          url={assetsApiKey}
          heads={accountAssetsHead}
          transformData={toAssetsTabItem}
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
    {
      name: Extrinsics,
      count: summary?.extrinsicsCount,
      children: (
        <DetailTable
          url={extrinsicsApiKey}
          heads={extrinsicsHead}
          transformData={toExtrinsicsTabTableItem}
        />
      ),
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
  ].filter(Boolean);

  useEffect(() => {
    if (id) {
      dispatch(accountFetchDetail(id));
      dispatch(accountFetchSummary(id));
    }

    return () => {
      dispatch(clearAccountDetail());
    };
  }, [dispatch, id]);

  const breadCrumb = (
    <BreadCrumb
      data={[
        { name: "Accounts", path: "/accounts" },
        { name: addressEllipsis(id) },
      ]}
    />
  );

  return (
    <DetailLayout breadCrumb={breadCrumb}>
      <Panel>
        <List data={listData} />
      </Panel>

      <DetailTabs tabs={tabs} />
      <NftInstancePreview
        open={isPreview}
        nftClass={previewNft?.class}
        nftInstance={previewNft?.instance}
        onClose={() => setIsPreview(false)}
      />
    </DetailLayout>
  );
}

export default OnChainAccount;
