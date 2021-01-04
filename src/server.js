import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initRouter from "./routes/web";
import initRouterHost from "./routes/web2";
import connectFlash from "connect-flash";
import { config } from "./config/session";
import passport from "passport"
import http from "http"
import socketio from "socket.io"
var app = express();
let server = http.createServer(app)
let io = socketio(server)
import initSockets from "./sockets/index"
ConnectDB();
configViewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
config(app);

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
initRouterHost(app);
initRouter(app);
initSockets(io)


server.listen(3000, () => {
  console.log("server is running");
});