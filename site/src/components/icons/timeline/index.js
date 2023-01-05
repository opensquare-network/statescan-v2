import { ReactComponent as Created } from "./create.svg";
import { ReactComponent as ForceCreated } from "./force-create.svg";
import { ReactComponent as MetadataSet } from "./set-metadata.svg";
import { ReactComponent as MetadataCleared } from "./clear-metadata.svg";
import { ReactComponent as AssetStatusChanged } from "./force-asset-status.svg";
import { ReactComponent as TeamChanged } from "./set-team.svg";
import { ReactComponent as OwnerChanged } from "./transfer-ownership.svg";
import { ReactComponent as Issued } from "./mint.svg";
import { ReactComponent as Burned } from "./burn.svg";
import { ReactComponent as AssetFrozen } from "./freeze-asset.svg";
import { ReactComponent as AssetThawed } from "./thaw-asset.svg";
import { ReactComponent as Destroyed } from "./destroy.svg";
import { ReactComponent as AttributeSet } from "./set-attribute.svg";
import { ReactComponent as AttributeCleared } from "./clear-attribute.svg";
import { ReactComponent as Redeposited } from "./redeposit.svg";
import { ReactComponent as ApprovedTransfer } from "./approve-transfer.svg";
import { ReactComponent as ApprovalCancelled } from "./cancel-approval.svg";
import { ReactComponent as LinkIcon } from "./link.svg";
import { ReactComponent as Placeholder } from "./placeholder.svg";

const icons = {
  Created,
  ForceCreated,
  MetadataSet,
  ClassMetadataSet: MetadataSet,
  CollectionMetadataSet: MetadataSet,
  MetadataCleared,
  ClassMetadataCleared: MetadataCleared,
  AssetStatusChanged,
  TeamChanged,
  OwnerChanged,
  Transferred: OwnerChanged,
  Issued,
  Burned,
  AssetFrozen,
  AssetThawed,
  ClassFrozen: AssetFrozen,
  ClassThawed: AssetThawed,
  Frozen: AssetFrozen,
  Thawed: AssetThawed,
  Destroyed,
  AttributeSet,
  AttributeCleared,
  Redeposited,
  ApprovedTransfer,
  ApprovalCancelled,
  LinkIcon,
  Placeholder,
};

export default icons;
