export function addressEllipsis(address, start = 4, end = 4) {
  if (!address) return;
  if (address.length <= start + end) return address;
  if (!address.slice) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export default function encodeUriQuery(q) {
  return Object.keys(q)
    .map((k) => `${k}=${encodeURIComponent(q[k])}`)
    .join("&");
}
