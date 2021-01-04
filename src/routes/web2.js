import express from "express";
import passport from "passport";
import {loginLocal} from "./../controllers/users/passport/index"

import { home, auth,user } from "../controllers/users/index";
import {host } from "../controllers/hosts/index"
import { authVal ,userVal,hostVal} from "./../validation/index";
import postController from "./../controllers/posts/postController"

let router = express.Router();
let initRoutesHost = (app) => {

    router.get("/login-host",host.getLogin)
    router.post("/login-host",host.postLogin)
    router.get("/host",host.getRegister)
    
  
    router.post("/host",hostVal.register,host.postRegister)
    return app.use("/", router);
  };
  module.exports = initRoutesHost;
  