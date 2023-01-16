import { ReactComponent as Created } from "./create.svg";
import { ReactComponent as ForceCreated } from "./force-create.svg";
import { ReactComponent as MetadataSet } from "./set-metadata.svg";
import { ReactComponent as MetadataCleared } from "./clear-metadata.svg";
import { ReactComponent as AssetStatusChanged } from "./force-asset-status.svg";
import { ReactComponent as TeamChanged } from "./set-team.svg";
import { ReactComponent as OwnerChanged } from "./transfer-ownership.svg";
import { ReactComponent as Frozen } from "./freeze-asset.svg";
import { ReactComponent as Thawed } from "./thaw-asset.svg";
import { ReactComponent as Destroyed } from "./destroy.svg";
import { ReactComponent as AttributeSet } from "./set-attribute.svg";
import { ReactComponent as AttributeCleared } from "./clear-attribute.svg";
import { ReactComponent as Redeposited } from "./redeposit.svg";

const icons = {
  Created,
  ForceCreated,
  Destroyed,
  ClassFrozen: Frozen,
  ClassThawed: Thawed,
  CollectionFrozen: Frozen,
  CollectionThawed: Thawed,
  OwnerChanged,
  TeamChanged,
  ClassMetadataSet: MetadataSet,
  ClassMetadataCleared: MetadataCleared,
  CollectionMetadataSet: MetadataSet,
  CollectionMetadataCleared: MetadataCleared,
  Redeposited,
  AttributeSet,
  AttributeCleared,
  AssetStatusChanged,
  ItemStatusChanged: AssetStatusChanged,
};

export default icons;
