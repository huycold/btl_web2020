import express from "express";
import session from "express-session";
import connectMongo from "connect-mongo";

let app = express();
require("dotenv").config();
let MongoStore = connectMongo(session);

let sessionStore = new MongoStore({ url: "mongodb://localhost:27017/data" });
let config = (app) => {
  app.use(
    session({
      key: "express.sid",
      secret: "mySecret",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};
module.exports = {
  config: config,
  sessionStore: sessionStore,
};
