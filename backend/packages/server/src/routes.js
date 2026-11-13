const Router = require("koa-router");
const { isAssetsChain, isUniquesChain, hasRevive } = require("./env");
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
  require("./features/runtime/routes"),
  require("./features/status/routes"),
  require("./features/overview/routes"),
  require("./features/txs/routes"),
];

const assetsRoutes = [require("./features/assets/routes")];

const uniquesRoutes = [require("./features/uniques/routes")];

const contractsRoutes = [require("./features/contracts/routes")];

const tokensRoutes = [require("./features/tokens/routes")];

const reviveAccountsRoutes = [require("./features/reviveAccounts/routes")];

module.exports = (app) => {
  for (const r of routes) {
    router.use(r.routes(), r.allowedMethods({ throw: true }));
  }

  if (isAssetsChain()) {
    for (const r of assetsRoutes) {
      router.use(r.routes(), r.allowedMethods({ throw: true }));
    }
  }

  if (isUniquesChain()) {
    for (const r of uniquesRoutes) {
      router.use(r.routes(), r.allowedMethods({ throw: true }));
    }
  }

  if (hasRevive()) {
    for (const r of contractsRoutes) {
      router.use(r.routes(), r.allowedMethods({ throw: true }));
    }

    for (const r of tokensRoutes) {
      router.use(r.routes(), r.allowedMethods({ throw: true }));
    }

    for (const r of reviveAccountsRoutes) {
      router.use(r.routes(), r.allowedMethods({ throw: true }));
    }
  }

  app.use(router.routes());
};
