require("dotenv").config();

const http = require("http");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const { startJobs } = require("./jobs");
const { setupSocketAndEmit } = require("./websocket");
const { handleThrow } = require("./middlewares/handleThrow");
const {
  block: { initBlockDb },
  account: { initAccountScanDb },
} = require("@statescan/mongo");

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(logger());
app.use(bodyParser());
app.use(helmet());
app.use(handleThrow);

require("./routes")(app);

const server = http.createServer(app.callback());
const port = parseInt(process.env.PORT) || 5010;

(async () => {
  await initBlockDb();
  await initAccountScanDb();
  await startJobs();
  await setupSocketAndEmit(server);

  server.listen(port, () =>
    console.log(`✅  The server is running at http://127.0.0.1:${port}/`),
  );
})();
