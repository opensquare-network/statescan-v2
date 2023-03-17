import noop from "lodash.noop";

/**
 * @description transform lookup types to dict
 */
export function transformLookupTypesDict(lookupTypes = []) {
  /** @type {[k: string]: string} */
  const dict = {};
  const laterItems = [];

  const later = (item) => laterItems.push(item);

  // collect dict
  each(lookupTypes, (item) => {
    const { id, type } = item;
    const { def, path } = type;

    if (def?.primitive) {
      dict[id] = def?.primitive;
    }
    // struct
    else if (def?.composite) {
      dict[id] = path.join("::");
    }
    // struct
    else if (def?.variant) {
      dict[id] = path.join("::");
    }
    // NOTE: not sure, def.array.type = 2
    else if (def?.array) {
      dict[id] = `[u8; ${def.array.len}]`;
    }
    // TODO: not sure, not like real Tuple
    else if (def?.tuple) {
      dict[id] = `Tuple(${def.tuple.join(", ")})`;
    }
    // ref like
    else if (def?.compact) {
      dict[id] = dict[def?.compact.type];
    }
    // ref like
    else if (def?.sequence) {
      dict[id] = dict[def?.sequence.type];
    }

    // didn't match the type yet, match it again later
    if (!dict[id]) {
      later(item);
    }
  });

  // collect missed dict
  each(laterItems, (item) => {
    const {
      id,
      type: {
        def: { compact, sequence },
      },
    } = item;
    const { type } = compact || sequence;

    dict[id] = dict[type];
  });
  laterItems.length = 0; // clean

  // fill extras to dict items
  each(lookupTypes, (item) => {
    const { id, type } = item;
    const { params } = type;

    if (params?.length) {
      dict[id] = dict[id] + parseParams(dict, params);
    }
  });

  return dict;
}

function each(array = [], cb = noop) {
  for (let idx = 0; idx < array.length; idx++) {
    const element = array[idx];
    cb(element, idx);
  }
}

function parseParams(dict = {}, params = []) {
  let genericStr = params
    .map((param) => {
      let name = param.name;

      const type = dict[param.type];
      if (type) {
        name += `: ${type}`;
      }

      return name;
    })
    .filter(Boolean)
    .join(", ");

  return `<${genericStr}>`;
}
