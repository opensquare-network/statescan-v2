import { toTransferTabTableItem } from "../../../utils/viewFuncs/toTableItem";
import {
  accountTransfersHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../../../utils/constants";
import { StyledPanelTableWrapper } from "../../styled/panel";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../pagination";
import Api from "../../../services/api";
import Table from "../../table";
import React from "react";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";

function TransfersTable({ address, setTransfersCount }) {
  const location = useLocation();
  const chainSetting = useSelector(chainSettingSelector);
  const [transfers, setTransfers] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!address) {
      return;
    }
    setTransfers(null);
    Api.fetch(`/accounts/${address}/transfers`, {
      page: getPageFromQuery(location) - 1,
      pageSize,
    }).then(({ result }) => {
      setTransfers(result?.items ?? []);
      setTotal(result?.total ?? 0);
      setTransfersCount(result?.total ?? 0);
    });
  }, [location, pageSize, address, setTransfersCount]);

  return (
    <StyledPanelTableWrapper>
      <Table
        heads={accountTransfersHead}
        data={toTransferTabTableItem(transfers, chainSetting)}
      />
      <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default TransfersTable;
