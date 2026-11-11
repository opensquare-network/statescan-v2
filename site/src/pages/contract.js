import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addressEllipsis } from "@osn/common";
import BreadCrumb from "../components/breadCrumb";
import List from "../components/list";
import { Panel } from "../components/styled/panel";
import DetailLayout from "../components/layout/detailLayout";
import DetailTabs from "../components/detail/tabs";
import DetailTable from "../components/detail/table";
import { Calls, contractCallsHead } from "../utils/constants";
import { toContractDetailItem } from "../utils/viewFuncs/toDetailItem";
import { toContractCallsTabTableItem } from "../utils/viewFuncs/toTableItem";
import {
  clearContractDetail,
  contractDetailLoadingSelector,
  contractDetailSelector,
  contractFetchDetail,
} from "../store/reducers/contractSlice";
import { contractCallsApi } from "../services/urls";
import { getContractName } from "../utils/revive";
import {
  clearHttpError,
  handleApiError,
} from "../utils/viewFuncs/errorHandles";

function Contract() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const detail = useSelector(contractDetailSelector);
  const detailLoading = useSelector(contractDetailLoadingSelector);

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

  const listData = useMemo(
    () => (detailLoading ? {} : toContractDetailItem(id, detail)),
    [id, detail, detailLoading],
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
