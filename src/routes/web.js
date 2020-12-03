import express from "express";
import passport from "passport";
import {loginLocal} from "./../controllers/users/passport/index"
import { home, auth,user } from "../controllers/users/index";
import { authVal ,userVal} from "./../validation/index";
import postController from "./../controllers/posts/postController"
loginLocal.initPassportLocal()
let router = express.Router();
let initRoutes = (app) => {
  router.get("/login-register",auth.isCheckLogout, auth.getAuthController);
  router.get("/home",auth.isCheckLogin,home.homeController);
  router.post("/register",auth.isCheckLogout,authVal.register, auth.postRegister);
  router.get("/verify/:token", auth.getVerifyToken);
  router.get("/logout",auth.isCheckLogin,auth.getLogout);
  router.post("/login",auth.isCheckLogout, passport.authenticate('local', { failureRedirect: '/login-register',successRedirect:"/home",successFlash:true,failureFlash:true }),loginLocal.initPassportLocal)
  router.get("/host",(req,res)=>{
    res.render
  })
  router.put("/user/update-avatar",auth.isCheckLogin,user.updateAvatar)
  router.put("/user/update-info",auth.isCheckLogin,userVal.updateInfo,user.updateInfo)
  router.get("/user",postController)
  return app.use("/", router);
};
module.exports = initRoutes;
