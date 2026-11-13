const { createRunner, getCronPattern, isDisabled } = require("../../jobs");

describe("contract sync job", () => {
  describe("getCronPattern", () => {
    it("runs every other day by default", () => {
      expect(getCronPattern({})).toEqual("0 30 3 */2 * *");
    });

    it("takes the pattern of the environment", () => {
      expect(getCronPattern({ CONTRACT_SYNC_CRON: " 0 0 4 * * * " })).toEqual(
        "0 0 4 * * *",
      );
    });
  });

  describe("isDisabled", () => {
    it("recognizes the switch off values", () => {
      expect(isDisabled("0")).toBe(true);
      expect(isDisabled("OFF")).toBe(true);
      expect(isDisabled("false")).toBe(true);
    });

    it("keeps a cron pattern enabled", () => {
      expect(isDisabled("0 30 3 */2 * *")).toBe(false);
    });
  });

  describe("createRunner", () => {
    it("does not start a run while the previous one is in flight", async () => {
      let resolveFirst;
      const run = jest.fn(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          }),
      );
      const runContractSync = createRunner(run);

      const first = runContractSync();
      await expect(runContractSync()).resolves.toBeNull();
      expect(run).toHaveBeenCalledTimes(1);

      resolveFirst({
        blockHeight: 1,
        contracts: 2,
        missing: 1,
        added: 1,
        failed: 0,
      });
      await expect(first).resolves.toMatchObject({ added: 1 });
    });

    it("reports a failed run instead of throwing, and runs again next time", async () => {
      const run = jest
        .fn()
        .mockRejectedValueOnce(new Error("node unavailable"))
        .mockResolvedValueOnce({
          blockHeight: 3,
          contracts: 1,
          missing: 0,
          added: 0,
          failed: 0,
        });
      const runContractSync = createRunner(run);

      await expect(runContractSync()).resolves.toBeNull();
      await expect(runContractSync()).resolves.toMatchObject({
        blockHeight: 3,
      });
      expect(run).toHaveBeenCalledTimes(2);
    });
  });
});
