import express from "express";
import passport from "passport";
import {loginLocal} from "./../controllers/users/passport/index"
import { home, auth } from "../controllers/users/index";
import { authVal } from "./../validation/index";
loginLocal.initPassportLocal()
let router = express.Router();
let initRoutes = (app) => {
  router.get("/login-register",auth.isCheckLogout, auth.getAuthController);
  router.get("/home",auth.isCheckLogin,home.homeController);
  router.post("/register",auth.isCheckLogout,authVal.register, auth.postRegister);
  router.get("/verify/:token", auth.getVerifyToken);
  router.get("/logout",auth.isCheckLogin,auth.getLogout);
  router.post("/login",auth.isCheckLogout, passport.authenticate('local', { failureRedirect: '/login',successRedirect:"/home",successFlash:true,failureFlash:true }),loginLocal.initPassportLocal)
  return app.use("/", router);
};
module.exports = initRoutes;
