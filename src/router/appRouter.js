const routerx = require("express-promise-router");
const appController = require("../controllers/appController");

const Router = routerx()
Router.post("/getChatText", appController.getChatText);



module.exports = Router