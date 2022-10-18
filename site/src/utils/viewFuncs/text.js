export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function hashEllipsis(hash = "", start = 6, end = 6) {
  if (!hash) {
    return hash;
  }

  if (hash.length <= start + end) {
    return hash;
  }

  let prefix;
  let main = hash;
  if (hash.startsWith("0x")) {
    prefix = "0x";
    main = hash.slice(2);
  }

  return `${prefix}${main.slice(0, start)}...${hash.slice(-end)}`;
}

export function isHash(term = "") {
  return /^0x[0-9a-f]{64}$/.test(term);
}
