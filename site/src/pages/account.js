import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis } from "@osn/common";
import { useDispatch, useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { toAccountDetailItem } from "../utils/viewFuncs/toDetailItem";
import DetailLayout from "../components/layout/detailLayout";
import {
  accountAssetsHead,
  accountExtinsicsHead,
  Assets,
  Extrinsics,
  Nft,
  nftClassInstanceHead,
  NftTransfer,
  nftTransfersHead,
  Transfers,
  transfersHead,
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
  accountDetailSelector,
  accountFetchDetail,
  clearAccountDetail,
} from "../store/reducers/accountSlice";
import DetailTabs from "../components/detail/tabs";
import { NftInstancePreview } from "../components/nft/preview/index";

function Account() {
  const { id } = useParams();
  const chainSetting = useSelector(chainSettingSelector);
  const dispatch = useDispatch();
  const [previewNft, setPreviewNft] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const showPreview = useCallback((nft) => {
    setPreviewNft(nft);
    setIsPreview(true);
  }, []);

  const detail = useSelector(accountDetailSelector);

  const listData = useMemo(
    () => (detail ? toAccountDetailItem(id, detail, chainSetting) : {}),
    [id, detail, chainSetting],
  );

  useEffect(() => {
    return () => {
      dispatch(clearDetailTables());
    };
  }, [dispatch]);

  const assetsApiKey = `/accounts/${id}/assets`;
  const transfersApiKey = `/accounts/${id}/transfers`;
  const extrinsicsApiKey = `/accounts/${id}/extrinsics`;
  const nftInstanceApiKey = `/accounts/${id}/nft/instances`;
  const nftTransfersApiKey = `/accounts/${id}/nft/transfers`;

  const tabs = [
    chainSetting.modules?.assets && {
      name: Assets,
      count: detail?.assetsCount,
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
      count: detail?.transfersCount,
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
      count: detail?.extrinsicsCount,
      children: (
        <DetailTable
          url={extrinsicsApiKey}
          heads={accountExtinsicsHead}
          transformData={toExtrinsicsTabTableItem}
        />
      ),
    },
    {
      name: Nft,
      count: detail?.nftInstancesCount,
      children: (
        <DetailTable
          url={nftInstanceApiKey}
          heads={nftClassInstanceHead}
          transformData={(instances) =>
            instances?.map((instance) =>
              toInstancesTabTableItem(
                instance.class,
                instance,
                showPreview,
                true,
              ),
            )
          }
        />
      ),
    },
    {
      name: NftTransfer,
      count: detail?.nftTransfersCount,
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
        nftClass={detail}
        nftInstance={previewNft}
        onClose={() => setIsPreview(false)}
      />
    </DetailLayout>
  );
}

export default Account;
