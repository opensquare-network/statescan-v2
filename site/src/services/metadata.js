import localForage from "localforage";

localForage.config({
  name: "statescan",
  version: 1.0,
});

export default async function getMetadata(provider) {
  await provider.isReady;
  const [genesisHash, runtimeVersion] = await Promise.all([
    provider.send("chain_getBlockHash", [0]),
    provider.send("state_getRuntimeVersion", []),
  ]);

  const id = `${genesisHash}-${runtimeVersion.specVersion}`;
  let metadata = await localForage.getItem(id);
  if (!metadata) {
    metadata = await provider.send("state_getMetadata", []);
    try {
      await localForage.setItem(id, metadata);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    id,
    metadata,
  };
}
