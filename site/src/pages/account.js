import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500, SF_Mono_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { withCopy } from "../HOC/withCopy";
import { addressEllipsis, toPrecision } from "../utils/viewFuncs";
import ValueDisplay from "../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Tooltip from "../components/tooltip";

const TextMonoSecondary = styled.span`
  ${SF_Mono_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

const TextMonoSecondaryWithCopy = withCopy(TextMonoSecondary);

function Account() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const chainSetting = useSelector(chainSettingSelector);

  useEffect(() => {
    if (id) {
      Api.fetch(`/accounts/${id}`, {}).then(({ result: account }) => {
        const data = {
          Address: <TextMonoSecondaryWithCopy>{id}</TextMonoSecondaryWithCopy>,
          //todo: add links
          "Total Balance": (
            <Tooltip
              tip={`${toPrecision(
                account?.data?.total,
                chainSetting.decimals,
              )} ${chainSetting.symbol}`}
            >
              <TextSecondary>
                <ValueDisplay
                  value={toPrecision(
                    account?.data?.total,
                    chainSetting.decimals,
                  )}
                  symbol={chainSetting.symbol}
                  abbreviate={false}
                />
              </TextSecondary>
            </Tooltip>
          ),
          Free: (
            <Tooltip
              tip={`${toPrecision(
                account?.data?.free,
                chainSetting.decimals,
              )} ${chainSetting.symbol}`}
            >
              <TextSecondary>
                <ValueDisplay
                  value={toPrecision(
                    account?.data?.free,
                    chainSetting.decimals,
                  )}
                  symbol={chainSetting.symbol}
                  abbreviate={false}
                />
              </TextSecondary>
            </Tooltip>
          ),
          Reversed: (
            <Tooltip
              tip={`${toPrecision(
                account?.data?.reversed,
                chainSetting.decimals,
              )} ${chainSetting.symbol}`}
            >
              <TextSecondary>
                <ValueDisplay
                  value={toPrecision(
                    account?.data?.reversed,
                    chainSetting.decimals,
                  )}
                  symbol={chainSetting.symbol}
                  abbreviate={false}
                />
              </TextSecondary>
            </Tooltip>
          ),
          Nonce: <TextSecondary>{account?.nonce}</TextSecondary>,
        };
        setListData(data);
      });
    }
  }, [id, chainSetting]);

  return (
    <Layout>
      <BreadCrumb
        data={[
          { name: "Accounts", path: "/accounts" },
          { name: addressEllipsis(id) },
        ]}
      />
      <Panel>
        <List data={listData} />
      </Panel>
    </Layout>
  );
}

export default Account;
