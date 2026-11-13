const {
  getNetwork,
  resolveNetwork,
  supportedNetworks,
  checkNodeChain,
} = require("../networks");

describe("networks", () => {
  const originalChain = process.env.CHAIN;

  afterEach(() => {
    if (originalChain === undefined) {
      delete process.env.CHAIN;
    } else {
      process.env.CHAIN = originalChain;
    }
  });

  it("keeps one entry per supported chain", () => {
    expect(supportedNetworks()).toEqual("polkadot, kusama");
  });

  it("gives the chain the rest of the package knows the network by", () => {
    expect(getNetwork("polkadot").chain).toEqual("statemint");
    expect(getNetwork("kusama").chain).toEqual("statemine");
  });

  it("rejects a network it does not know", () => {
    expect(() => getNetwork("paseo")).toThrow(/Unknown network paseo/);
  });

  it("resolves the network from CHAIN", () => {
    process.env.CHAIN = "statemine";
    expect(resolveNetwork().name).toEqual("kusama");

    process.env.CHAIN = "statemint";
    expect(resolveNetwork().name).toEqual("polkadot");
  });

  it("falls back to polkadot when CHAIN is not set", () => {
    delete process.env.CHAIN;
    expect(resolveNetwork().name).toEqual("polkadot");
  });

  it("rejects a chain without revive", () => {
    process.env.CHAIN = "westmint";
    expect(() => resolveNetwork()).toThrow(/Chain westmint is not supported/);
  });

  it("lets an explicit name win over CHAIN", () => {
    process.env.CHAIN = "statemint";
    expect(resolveNetwork("kusama").name).toEqual("kusama");
  });

  it("rejects a node which serves another chain", () => {
    const api = {
      runtimeVersion: { specName: { toString: () => "statemint" } },
    };

    expect(() => checkNodeChain(api, getNetwork("polkadot"))).not.toThrow();
    expect(() => checkNodeChain(api, getNetwork("kusama"))).toThrow(
      /serves statemint, not statemine/,
    );
  });
});
