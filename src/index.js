// require("dotenv/config");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../serverConf");
const Router = require("./router");
const http = require("http");
const useragent = require("express-useragent");
const rateLimit = require("express-rate-limit");
const methodOverride = require("method-override");
const compression = require("compression");

const app = express();
const server = http.Server(app);

app.use(compression());
app.use(useragent.express());
app.use(express.static(config.DIR + "/uploads"));
app.use(express.static(config.DIR + "/client"));
app.use(bodyParser.json({ limit: "15360mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(methodOverride());

const apiV3Limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(cors("*"));
app.use("/api", apiV3Limiter, (req, res, next) => {
  Router(req, res, next);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(config.DIR, "client/index.html"));
});

server.listen(config.ServerPort, () => {
  console.log(`Started server on => http://localhost:${config.ServerPort}`);
});
