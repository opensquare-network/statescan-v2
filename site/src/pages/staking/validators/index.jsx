import { useMemo } from "react";
import { StyledPanelTableWrapper } from "../../../components/styled/panel";
import BreadCrumb from "../../../components/breadCrumb";
import Layout from "../../../components/layout";
import { useValidatorsData } from "./useValidatorsData";
import StakingValidatorsTable from "./table";
import Pagination from "../../../components/pagination";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useValidatorsFilter } from "../../../hooks/filter/useValidatorsFilter";
import Filter from "../../../components/filter";
import { isAddress } from "@polkadot/util-crypto";
import BigNumber from "bignumber.js";

export default function StakingValidators() {
  const {
    page = 1,
    search = "",
    onlyActive = "Yes",
    no100Commission = "Yes",
    hasIdentityOnly = "Yes",
  } = useQueryParams();
  const filter = useValidatorsFilter();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data: fullData, loading } = useValidatorsData();

  const paginatedData = useMemo(() => {
    if (!fullData?.items) {
      return { items: [], total: 0 };
    }

    let filteredItems = [...fullData.items];

    if (search) {
      const searchLower = search.toLowerCase();
      const isSearchAddr = isAddress(search);

      filteredItems = filteredItems.filter((validator) => {
        if (isSearchAddr) {
          return validator.address.toLowerCase().includes(searchLower);
        }
        return validator.identity?.toLowerCase().includes(searchLower);
      });
    }

    if (onlyActive === "Yes") {
      filteredItems = filteredItems.filter((validator) => validator.active);
    }

    if (no100Commission === "Yes") {
      filteredItems = filteredItems.filter((validator) => {
        const commission = new BigNumber(validator.commission || "0");
        const maxCommission = new BigNumber("1000000000");
        return !commission.isEqualTo(maxCommission);
      });
    }

    if (hasIdentityOnly === "Yes") {
      filteredItems = filteredItems.filter((validator) => validator.identity);
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: filteredItems.length,
    };
  }, [
    fullData,
    page,
    pageSize,
    search,
    onlyActive,
    no100Commission,
    hasIdentityOnly,
  ]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Validators" }]} />

      <Filter data={filter} />

      <StyledPanelTableWrapper
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={paginatedData.total}
          />
        }
      >
        <StakingValidatorsTable data={paginatedData.items} loading={loading} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}
