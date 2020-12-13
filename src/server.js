import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initRouter from "./routes/web";
import initRouterHost from "./routes/web2";
import connectFlash from "connect-flash";
import { config } from "./config/session";
import passport from "passport"
var app = express();
ConnectDB();
configViewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
config(app);

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
initRouterHost(app);
initRouter(app);


app.listen(3000, () => {
  console.log("server is running");
});
