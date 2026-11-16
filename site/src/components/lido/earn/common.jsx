import {
  LIDO_EARN_ETH_VAULT_ADDRESS,
  LIDO_EARN_USD_VAULT_ADDRESS,
} from "../../../services/evm/lido";
import BreadCrumb from "../../breadCrumb";
import { DetailedTime } from "../../styled/time";
import { toLidoTimestamp } from "../../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../../utils/viewFuncs/text";

export const EARN_SHARES_DECIMALS = 18;

export const LIDO_EARN_CONFIGS = {
  eth: {
    path: "/earn/eth",
    title: "earnETH",
    vaultAddress: LIDO_EARN_ETH_VAULT_ADDRESS,
  },
  usd: {
    path: "/earn/usd",
    title: "earnUSD",
    vaultAddress: LIDO_EARN_USD_VAULT_ADDRESS,
  },
};

export function getLidoEarnTypeByVault(vault) {
  const normalizedVault = vault?.toLowerCase();

  return Object.entries(LIDO_EARN_CONFIGS).find(
    ([, config]) => config.vaultAddress.toLowerCase() === normalizedVault,
  )?.[0];
}

export function EarnTime({ time }) {
  const timestamp = toLidoTimestamp(time);

  return timestamp ? <DetailedTime ts={timestamp} /> : "--";
}

export function EarnDetailBreadcrumb({ detailName, id, tabName, vault }) {
  const earnType = getLidoEarnTypeByVault(vault);
  const earnConfig = LIDO_EARN_CONFIGS[earnType];
  const title = id ? hashEllipsis(id) : detailName;

  return (
    <BreadCrumb
      data={
        earnConfig
          ? [
              { name: earnConfig.title, path: earnConfig.path },
              {
                name: tabName,
                path: `${earnConfig.path}?tab=${tabName.toLowerCase()}`,
              },
              { name: title },
            ]
          : [{ name: title }]
      }
    />
  );
}
