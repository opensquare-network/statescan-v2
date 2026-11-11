import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressEllipsis } from "@osn/common";
import BreadCrumb from "../components/breadCrumb";
import List from "../components/list";
import { Panel } from "../components/styled/panel";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";
import DetailTable from "../components/detail/table";
import {
  Calls,
  Contract as ContractTab,
  contractCallsHead,
} from "../utils/constants";
import { toContractDetailItem } from "../utils/viewFuncs/toDetailItem";
import { toContractCallsTabTableItem } from "../utils/viewFuncs/toTableItem";
import {
  clearContractDetail,
  contractDetailLoadingSelector,
  contractDetailSelector,
  contractFetchDetail,
} from "../store/reducers/contractSlice";
import api from "../services/api";
import { contractCallsApi, verifiedContractApi } from "../services/urls";
import { getContractName } from "../utils/revive";
import { useVerifiedContractsVersion } from "../context/verifiedContracts";
import ContractCode from "../components/contract/contractCode";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";

function Contract() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detail = useSelector(contractDetailSelector);
  const detailLoading = useSelector(contractDetailLoadingSelector);
  const verifiedContractsVersion = useVerifiedContractsVersion();
  const [verifiedContract, setVerifiedContract] = useState(null);

  useEffect(() => {
    if (id) {
      clearHttpError(dispatch);
      dispatch(contractFetchDetail(id)).catch((e) =>
        handleApiError(e, dispatch),
      );
    }

    return () => {
      dispatch(clearContractDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;
    setVerifiedContract(null);
    api.fetch(verifiedContractApi(id)).then(({ result, error }) => {
      if (cancelled) {
        return;
      }

      setVerifiedContract(error ? null : result);
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const hasVerifiedSource =
    !!verifiedContract &&
    (!!verifiedContract.sourceCode ||
      (verifiedContract.additionalSources || []).length > 0);

  const listData = useMemo(
    () => (detailLoading ? {} : toContractDetailItem(id, detail)),
    // Recompute the name once the verified contracts are loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, detail, detailLoading, verifiedContractsVersion],
  );

  const tabs = [
    {
      name: Calls,
      count: detail?.callsCount,
      children: (
        <DetailTable
          url={contractCallsApi(id)}
          heads={contractCallsHead}
          transformData={toContractCallsTabTableItem}
        />
      ),
    },
    ...(hasVerifiedSource
      ? [
          {
            name: ContractTab,
            children: <ContractCode key={id} contract={verifiedContract} />,
          },
        ]
      : []),
  ];

  return (
    <DetailLayout
      breadCrumb={
        <BreadCrumb
          data={[
            { name: "Contracts", path: "/contracts" },
            { name: getContractName(id) || addressEllipsis(id) },
          ]}
        />
      }
    >
      <Panel>
        <List data={listData} />
      </Panel>

      <DetailTabs tabs={tabs} />
    </DetailLayout>
  );
}

export default Contract;
