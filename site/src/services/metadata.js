export default async function getMetadata(provider) {
  await provider.isReady;
  const [genesisHash, runtimeVersion] = await Promise.all([
    provider.send("chain_getBlockHash", [0]),
    provider.send("state_getRuntimeVersion", []),
  ]);

  const id = `${genesisHash}-${runtimeVersion.specVersion}`;
  let metadata = localStorage.getItem(id);
  if (!metadata) {
    metadata = await provider.send("state_getMetadata", []);
    localStorage.setItem(id, metadata);
  }

  return {
    id,
    metadata,
  };
}
