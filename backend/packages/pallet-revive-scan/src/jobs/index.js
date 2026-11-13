const { CronJob } = require("cron");
const { logger } = require("@osn/scan-common");
const { syncContracts } = require("../scripts/contracts/syncContracts");

const timeZone = "Asia/Shanghai";
// 03:30 on the odd days of the month, i.e. every other day. Locating the contracts the
// scan missed reads the state of past blocks, a slow run is not worth a daily tick.
const everyOtherDayCron = "0 30 3 */2 * *";

function startJobs() {
  return new CronJob(
    everyOtherDayCron,
    async () => {
      try {
        await syncContracts();
      } catch (e) {
        // A failing run must not stop the scan, the next tick retries.
        logger.error("Error in the contract sync job", e);
      }
    },
    null,
    true,
    timeZone,
  );
}

module.exports = {
  startJobs,
};
