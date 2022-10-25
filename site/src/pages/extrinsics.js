import { ReactComponent as CheckIcon } from "../components/icons/check.svg";
import { ReactComponent as CrossIcon } from "../components/icons/cross.svg";
import { hashEllipsis } from "../utils/viewFuncs/text";
import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import {
  basicFilters,
  extrinsicsHead,
  LIST_DEFAULT_PAGE_SIZE,
} from "../utils/constants";
import Link from "../components/styled/link";
import Layout from "../components/layout";
import Table from "../components/table";
import styled from "styled-components";
import Api from "../services/api";
import { SF_Mono_14_500 } from "../styles/text";
import { no_scroll_bar } from "../styles";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery } from "../utils/viewFuncs";
import Filter from "../components/filter";
import * as queryString from "query-string";
import Tooltip from "../components/tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpecsFilter,
  filtersSelector,
} from "../store/reducers/filterSlice";

const StyledPanel = styled(Panel)`
  overflow-x: scroll;
  ${no_scroll_bar};
`;

const ColoredLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
`;

const ColoredMonoLink = styled(Link)`
  color: ${({ theme }) => theme.theme500};
  ${SF_Mono_14_500};
`;

function Extrinsics() {
  const location = useLocation();
  const [pendingRequestController, setPendingRequestController] =
    useState(null);
  const [extrinsics, setExtrinsics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const dispatch = useDispatch();
  const specFilters = useSelector(filtersSelector);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(fetchSpecsFilter());
  }, []);

  useEffect(() => {
    if (specFilters) {
      const specs = {
        value: specFilters[0].specVersion,
        name: "Spec",
        query: "",
        options: specFilters.map((item) => {
          return {
            text: item.specVersion,
            value: item.specVersion,
            getDescendant: () => {
              return {
                value: item.pallets[0].name,
                name: "Section",
                query: "section",
                options: item.pallets.map((item) => {
                  return {
                    text: item.name,
                    value: item.name,
                    getDescendant: () => {
                      return {
                        value: item.calls[0],
                        name: "Method",
                        query: "method",
                        options: item.calls.map((item) => {
                          return {
                            text: item,
                            value: item,
                          };
                        }),
                      };
                    },
                  };
                }),
              };
            },
          };
        }),
      };
      const section = {
        value: specFilters[0].pallets[0].name,
        name: "Section",
        query: "section",
        options: specFilters[0].pallets.map((item) => {
          return {
            text: item.name,
            value: item.name,
            getDescendant: () => {
              return {
                value: item.calls[0],
                name: "Method",
                query: "method",
                options: item.calls.map((item) => {
                  return {
                    text: item,
                    value: item,
                  };
                }),
              };
            },
          };
        }),
      };
      const method = {
        value: specFilters[0].pallets[0].calls[0],
        name: "Method",
        query: "method",
        options: specFilters[0].pallets[0].calls.map((method) => {
          return {
            text: method,
            value: method,
          };
        }),
      };
      setFilters([specs, section, method]);
    }
  }, [specFilters]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    Api.fetch(
      `/extrinsics`,
      {
        page: getPageFromQuery(location) - 1,
        pageSize,
        signed_only: "true",
        ...queryString.parse(location.search),
      },
      { signal: controller.signal },
    )
      .then(({ result }) => {
        result?.items && setExtrinsics(result?.items);
        result?.total && setTotal(result?.total);
        setLoading(false);
        setPendingRequestController(null);
      })
      .catch((e) => {
        if (e.message === "The user aborted a request.") {
          return;
        }
        setLoading(false);
        setPendingRequestController(null);
      });
    if (pendingRequestController) {
      pendingRequestController.abort();
    }
    setPendingRequestController(controller);
  }, [location, pageSize]);

  const data =
    extrinsics?.map((extrinsic, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}-
          {extrinsic?.indexer?.extrinsicIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/block/${extrinsic?.indexer?.blockHeight}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        extrinsic?.indexer?.blockTime,
        <Tooltip tip={extrinsic.hash}>
          <ColoredMonoLink
            to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
          >
            {hashEllipsis(extrinsic.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        `${extrinsic?.call?.section}(${extrinsic?.call?.method})`,
        extrinsic?.call,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Extrinsics" }]} />
      <Filter
        title={`All ${total.toLocaleString()} extrinsics`}
        data={[...filters, ...basicFilters]}
      />
      <StyledPanel>
        <Table heads={extrinsicsHead} data={data} loading={loading} />
        <Pagination page={parseInt(page)} pageSize={pageSize} total={total} />
      </StyledPanel>
    </Layout>
  );
}

export default Extrinsics;
