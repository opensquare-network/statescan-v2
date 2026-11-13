const { CronJob } = require("cron");

const timeZone = "Asia/Shanghai";
// 03:30 on the odd days of the month, i.e. every other day. Locating the contracts the
// scan missed reads the state of past blocks, which is slow, and only a handful appears
// between two runs.
const everyOtherDayCron = "0 30 3 */2 * *";
// CONTRACT_SYNC_CRON=0 keeps the job out of the scan process, e.g. when the endpoint does
// not keep the state of past blocks and a run from cron uses another one.
const disabledValues = ["0", "off", "no", "false"];

function getCronPattern(env = process.env) {
  const value = (env.CONTRACT_SYNC_CRON || "").trim();
  return value === "" ? everyOtherDayCron : value;
}

function isDisabled(pattern) {
  return disabledValues.includes(String(pattern).trim().toLowerCase());
}

// One run at a time: a slow run must not stack up with the next tick, the two would
// compete for the node and the database.
function createRunner(run) {
  let running = false;

  return async function runContractSync() {
    if (running) {
      console.warn(
        "The previous contract sync is still running, skip this run",
      );
      return null;
    }

    running = true;
    try {
      const result = await run();
      console.log(
        `Contract sync at block ${result.blockHeight}: ${result.missing} of ${result.contracts} contracts missed, ${result.added} added, ${result.failed} failed`,
      );
      return result;
    } catch (e) {
      // A failing run must not stop the scan process, the next one retries.
      console.error(`Error in the contract sync job: ${e.message}`);
      return null;
    } finally {
      running = false;
    }
  };
}

// The scan process calls this from src/index.js. `run` is only passed by the tests.
function startJobs({ env = process.env, run = null } = {}) {
  const pattern = getCronPattern(env);
  if (isDisabled(pattern)) {
    console.log("The contract sync job is disabled by CONTRACT_SYNC_CRON");
    return null;
  }

  const worker =
    run ||
    (() => require("../scripts/contracts/syncContracts").syncContracts());
  const job = new CronJob(pattern, createRunner(worker), null, true, timeZone);
  console.log(`Contract sync job scheduled: ${pattern} (${timeZone})`);

  return job;
}

module.exports = {
  startJobs,
  createRunner,
  getCronPattern,
  isDisabled,
};
