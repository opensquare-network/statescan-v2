import cloneDeep from "lodash.clonedeep";
import noop from "lodash.noop";

/**
 * @description transform lookup types to dict
 */
export function parseLookupTypesToDict(lookupTypes = []) {
  /** @type {{[k: string]: string}} */
  const dict = {};
  const laterTypeItems = [];
  const laterParamsItems = [];

  // collect dict
  // specs
  // - def: object, has only single key
  each(lookupTypes, (item) => {
    const { id, type } = item ?? {};
    const { def, path, params } = type ?? {};

    if (def?.primitive) {
      dict[id] = def?.primitive;
    }
    // struct
    else if (def?.composite) {
      dict[id] = parseUseCratePaths(path);
    }
    // struct
    else if (def?.variant) {
      dict[id] = parseUseCratePaths(path);
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
    // historicMetaCompat
    // value: string
    else if (def?.historicMetaCompat) {
      dict[id] = def.historicMetaCompat;
    }
    // unknown def, for safe
    else {
      const key = Object.keys(def ?? {})[0] ?? "";
      dict[id] = def[key];
    }

    if (params?.length) {
      laterParamsItems.push(item);
    }

    // didn't match the type yet, match it again later
    // e.g. 9 map to 10, 12 map to 178
    if (!dict[id]) {
      laterTypeItems.push(item);
    }
  });

  // collect missed dict
  // compact, sequence
  each(laterTypeItems, (item) => {
    const { id } = item ?? {};
    const { type } =
      item?.type?.def?.compact ?? item?.type?.def?.sequence ?? {};

    dict[id] = dict[type];
  });
  laterTypeItems.length = 0; // clean

  // parse generic params
  each(laterParamsItems, (item) => {
    const { id, type } = item;
    const { params } = type;

    dict[id] = dict[id] + parseGenericParams(dict, params);
  });
  laterParamsItems.length = 0; // clean

  return dict;
}

/**
 * @param {ReturnType<transformLookupTypesDict>} dict
 */
export function parseTypedPallets(pallets = [], dict = {}) {
  return each(pallets, (pallet) => {
    pallet = cloneDeep(pallet);

    if (pallet.constants) {
      pallet.constants = each(pallet.constants, (constant) => {
        const { type, docs } = constant;

        if (type) {
          constant.type = dict[type];
        }

        if (docs) {
          constant.docs = parseDocs(docs);
        }

        return constant;
      });
    }

    if (pallet.storage?.items) {
      pallet.storage.items = each(pallet.storage?.items, (storage) => {
        const {
          type: { plain, map },
          docs,
        } = storage;

        if (map) {
          const { key, value } = map;
          storage.type.map.key = dict[key];
          storage.type.map.value = dict[value];
        }

        if (plain) {
          storage.type.plain = dict[plain];
        }

        if (docs) {
          storage.docs = parseDocs(docs);
        }

        return storage;
      });
    }

    return pallet;
  });
}

/**
 * @returns {any[]}
 */
function each(array = [], cb = noop) {
  const res = [];

  if (array?.length) {
    for (let idx = 0; idx < array.length; idx++) {
      const element = array[idx];
      res.push(cb(element, idx, array));
    }
  }

  return res;
}

/**
 * @description for struct, fn etc.
 */
function parseGenericParams(dict = {}, params = []) {
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

/**
 * @param {string[]} docs
 * @returns {string}
 * @description parse docs array to string text
 */
function parseDocs(docs = []) {
  return docs
    .map((text) => {
      if (text === "") {
        return "\n";
      }
      return text;
    })
    .join("")
    .trim();
}

/**
 * @description `::`
 */
function parseUseCratePaths(paths = []) {
  return paths.join("::");
}
