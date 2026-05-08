import { StatusNegativeTag, Tag, TagThemed } from "../../tag";

export const LIDO_VAULT_STATUS = {
  CREATED: "Created",
  CONNECTED: "Connected",
  DISCONNECTING: "Disconnecting",
  PENDING_DISCONNECT: "PendingDisconnect",
  DISCONNECTED: "Disconnected",
};

export const LIDO_VAULT_STATUS_OPTIONS = Object.values(LIDO_VAULT_STATUS);

const STATUS_COMPONENTS = {
  [LIDO_VAULT_STATUS.CREATED]: Tag,
  [LIDO_VAULT_STATUS.CONNECTED]: TagThemed,
  [LIDO_VAULT_STATUS.DISCONNECTING]: TagThemed,
  [LIDO_VAULT_STATUS.PENDING_DISCONNECT]: TagThemed,
  [LIDO_VAULT_STATUS.DISCONNECTED]: StatusNegativeTag,
};

export default function LidoVaultStatus({ status }) {
  if (!status) {
    return "--";
  }

  const Status = STATUS_COMPONENTS[status] || Tag;

  return <Status>{status}</Status>;
}
