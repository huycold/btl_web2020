import express from "express";
import passport from "passport";
import {loginLocal} from "./../controllers/users/passport/index"
import {post } from "./../controllers/posts/index"
import { home, auth,user } from "../controllers/users/index";
import {host } from "../controllers/hosts/index"
import { authVal ,userVal,hostVal} from "./../validation/index";
import postController from "./../controllers/posts/postController"
loginLocal.initPassportLocal()


let router = express.Router();
let initRoutes = (app) => {
  router.get("/login-host",host.getLogin)
  // router.post("/login-host",passport.authenticate('local', { failureRedirect: '/login-host',successRedirect:"/host",successFlash:true,failureFlash:true }),loginHost.initPassportLocal)
  router.get("/login-register",auth.isCheckLogout, auth.getAuthController);
  router.get("/home",auth.isCheckLogin,home.homeController);
  router.post("/register",auth.isCheckLogout,authVal.register, auth.postRegister);
  router.get("/verify/:token", auth.getVerifyToken);
  router.get("/logout",auth.isCheckLogin,auth.getLogout);
  router.post("/login",auth.isCheckLogout, passport.authenticate('local', { failureRedirect: '/login-register',successRedirect:"/home",successFlash:true,failureFlash:true }),loginLocal.initPassportLocal)

  router.get("/host",host.getRegister)
  router.post("/register-host",hostVal.register,host.postRegister)
  router.put("/user/update-avatar",auth.isCheckLogin,user.updateAvatar)
  router.put("/user/update-info",auth.isCheckLogin,userVal.updateInfo,user.updateInfo)

  router.get("/post",post.getPost)

  return app.use("/", router);
};
module.exports = initRoutes;
