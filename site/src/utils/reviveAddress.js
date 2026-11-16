import { getAddress } from "viem";

export function isEvmAddress(address) {
  return typeof address === "string" && /^0x[0-9a-fA-F]{40}$/.test(address);
}

export function normalizeEvmAddress(address) {
  if (typeof address !== "string") {
    return null;
  }

  const value = address.toLowerCase();
  return /^0x[0-9a-f]{40}$/.test(value) ? value : null;
}

export function formatEvmAddress(address) {
  const normalized = normalizeEvmAddress(address);
  if (!normalized) {
    return address;
  }

  try {
    return getAddress(normalized);
  } catch {
    return normalized;
  }
}
