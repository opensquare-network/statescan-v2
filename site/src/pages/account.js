import { Panel } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styled from "styled-components";
import Api from "../services/api";
import { Inter_14_500 } from "../styles/text";
import { useParams } from "react-router-dom";
import List from "../components/list";
import { addressEllipsis, toPrecision } from "../utils/viewFuncs";
import ValueDisplay from "../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";
import Tooltip from "../components/tooltip";
import Tab from "../components/tab";
import TransfersTable from "../components/account/tabTables/transfersTable";
import Address from "../components/address";

const TextSecondary = styled.span`
  ${Inter_14_500};
  color: ${({ theme }) => theme.fontSecondary};
`;

function Account() {
  const { id } = useParams();
  const [listData, setListData] = useState({});
  const [transfersCount, setTransfersCount] = useState(0);
  const chainSetting = useSelector(chainSettingSelector);

  useEffect(() => {
    if (id) {
      Api.fetch(`/accounts/${id}`, {}).then(({ result: account }) => {
        const data = {
          Address: <Address address={id} ellipsis={false} />,
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
                    account?.data?.reserved,
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

      <Tab text={"Transfers"} count={transfersCount} active />
      <TransfersTable address={id} setTransfersCount={setTransfersCount} />
    </Layout>
  );
}

export default Account;
