const Router = require("koa-router");
const router = new Router();

const routes = [
  require("./features/blocks/routes"),
  require("./features/accounts/routes"),
  require("./features/extrinsics/routes"),
  require("./features/events/routes"),
  require("./features/calls/routes"),
  require("./features/transfers/routes"),
  require("./features/unfinalized/routes"),
  require("./features/search/routes"),
  require("./features/spec/routes"),
  require("./features/assets/routes"),
];

module.exports = (app) => {
  for (const r of routes) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  app.use(router.routes());
};
