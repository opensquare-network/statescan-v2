import { useLocation } from "react-router-dom";
import noop from "lodash.noop";
import Pagination from "../pagination";
import { StyledPanelTableWrapper } from "../styled/panel";
import Table from "../table";
import { useSelector } from "react-redux";
import { getPageFromQuery } from "../../utils/viewFuncs";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { chainSettingSelector } from "../../store/reducers/settingSlice";

export default function PagingTable({
  heads,
  transformData = noop,
  data,
  isLoading,
}) {
  const chainSetting = useSelector(chainSettingSelector);
  const location = useLocation();
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const items = (data || []).slice(pageSize * (page - 1), pageSize * page);

  return (
    <StyledPanelTableWrapper
      footer={
        <Pagination page={page} pageSize={pageSize} total={data?.length} />
      }
    >
      <Table
        loading={isLoading}
        heads={heads}
        data={transformData(items, chainSetting)}
      />
    </StyledPanelTableWrapper>
  );
}
