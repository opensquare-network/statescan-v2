import { parseInt } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import { StyledPanelTableWrapper } from "../components/styled/panel";
import Table from "../components/table";
import {
  registrarsFetchList,
  registrarsListLoadingSelector,
  registrarsListSelector,
} from "../store/reducers/registrarsSlice";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import { LIST_DEFAULT_PAGE_SIZE, registrarsHead } from "../utils/constants";
import { getPageFromQuery } from "../utils/viewFuncs";

export default function RegistrarsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const chainSetting = useSelector(chainSettingSelector);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const list = useSelector(registrarsListSelector);
  const loading = useSelector(registrarsListLoadingSelector);

  useEffect(() => {
    dispatch(registrarsFetchList(page - 1, pageSize));
  }, [dispatch, page, pageSize]);

  const data = [];

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Registrars" }]} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            total={list?.total}
          />
        }
      >
        <Table heads={registrarsHead} data={data} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
