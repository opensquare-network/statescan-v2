import { StatusNegativeTag, Tag, TagThemed } from "../../tag";

export const LIDO_VAULT_STATUS = {
  CREATED: "Created",
  CONNECTED: "Connected",
  PENDING_DISCONNECT: "PendingDisconnect",
  DISCONNECTED: "Disconnected",
};

const LIDO_VAULT_STATUS_BY_VALUE = {
  0: LIDO_VAULT_STATUS.CREATED,
  1: LIDO_VAULT_STATUS.CONNECTED,
  2: LIDO_VAULT_STATUS.PENDING_DISCONNECT,
  3: LIDO_VAULT_STATUS.DISCONNECTED,
};

export const LIDO_VAULT_STATUS_OPTIONS = Object.values(LIDO_VAULT_STATUS);

const STATUS_COMPONENTS = {
  [LIDO_VAULT_STATUS.CREATED]: Tag,
  [LIDO_VAULT_STATUS.CONNECTED]: TagThemed,
  [LIDO_VAULT_STATUS.PENDING_DISCONNECT]: TagThemed,
  [LIDO_VAULT_STATUS.DISCONNECTED]: StatusNegativeTag,
};

export default function LidoVaultStatus({ status }) {
  if (status == null || status === "") {
    return "--";
  }

  const statusText = LIDO_VAULT_STATUS_BY_VALUE[status] || status;
  const Status = STATUS_COMPONENTS[statusText] || Tag;

  return <Status>{statusText}</Status>;
}
