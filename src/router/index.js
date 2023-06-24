const routerx = require("express-promise-router");
const appRouter = require("./appRouter");
const Router = routerx();

Router.use("/app", appRouter);
module.exports = Router;
