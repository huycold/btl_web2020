import { validationResult } from "express-validator/check";
import { auth } from "./../../servies/index";
import connectFlash from "connect-flash";
import passport from "passport"
const getAuthController = (req, res) => {
  res.render("auth/masterUser", {
    errors: req.flash("errors"),
    success: req.flash("success"),
  });
};
const postRegister = async (req, res) => {
  let errorArray = [];
  let successArray = [];

  let errorValida = Object.values(validationResult(req).mapped());
  if (errorValida.length > 0) {
    errorValida.map((item) => {
      errorArray.push(item.msg);
    });

    req.flash("errors", errorArray);
    res.redirect("/login-register");

    return;
  }
  try {
    await auth
      .register(
        req.body.email,
        req.body.gender,
        req.body.password,
        req.protocol,
        req.get("host")
      )
      .then((kq) => {
        successArray.push(kq);
        req.flash("success", successArray);
        return res.redirect("/login-register");
      });
  } catch (error) {
    errorArray.push(error);
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }
};
const getVerifyToken = async (req, res) => {
  let successArray = [];

  
  await auth.verifyToken(token);
  successArray.push(
    "ban  da kich hoat thanh cong vui long dang nhap tai khoan"
  );
  req.flash("success", successArray);
  return res.redirect("/login-register");
  try {
    var token = req.params.token;
  } catch (error) {
    console.log(error);
  }
};
const getLogout  = (req,res)=>{
  req.logout();
  req.flash("success","ban da logout thanh cong")
  res.redirect("/login-register")
}
const isCheckLogin =(req,res,next)=>{
  if(!req.isAuthenticated()){
    return res.redirect("/login-register")
  }
  next()
}
const isCheckLogout =(req,res,next)=>{
  if(req.isAuthenticated()){
    return res.redirect("/home")
  }
  next()
}
module.exports = {
  getAuthController: getAuthController,
  postRegister: postRegister,
  getVerifyToken: getVerifyToken,
  getLogout:getLogout,
  isCheckLogin:isCheckLogin,
  isCheckLogout:isCheckLogout
};
