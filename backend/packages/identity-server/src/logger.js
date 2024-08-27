const log4js = require("log4js");

const logLevel = process.env.LOG_LEVEL || "debug";
const isProduction = process.env.NODE_ENV === "production";

const statusCategory = "status";
const blockFileCategory = "block";

log4js.configure({
  appenders: {
    [statusCategory]: { type: "file", filename: "log/status.log" },
    [blockFileCategory]: { type: "file", filename: "log/block.log" },
    errorFile: {
      type: "file",
      filename: "log/errors.log",
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    out: { type: "stdout" },
  },
  categories: {
    default: {
      appenders: [isProduction ? statusCategory : "out", "errors"],
      level: logLevel,
    },
    [blockFileCategory]: {
      appenders: [isProduction ? blockFileCategory : "out", "errors"],
      level: logLevel,
    },
  },
});

const statusLogger = log4js.getLogger(statusCategory);
const blockLogger = log4js.getLogger(blockFileCategory);

module.exports = {
  statusLogger,
  blockLogger,
};
