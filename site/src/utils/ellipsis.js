export function ellipsisHash(hash = "", start = 6, end = 6) {
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
