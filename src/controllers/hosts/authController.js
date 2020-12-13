import { validationResult } from "express-validator/check";
import HostModel from "./../../model/hostModel"
import connectFlash from "connect-flash";
import passport from "passport"
import {host} from "./../../servies/index"
import { reject, resolve } from "bluebird";
const getRegister  = (req,res)=>{
  res.render("auth/masterHost",{
    errors:req.flash("errors")
  })
}
const getLogin = (req,res)=>{
  res.render("auth/loginHost",{
    errors:req.flash("errors")
  })
}
const postRegister = async(req, res) => {

  let errorArray = [];
  let successArray = [];

  let errorValida = Object.values(validationResult(req).mapped());
  if (errorValida.length > 0) {
    errorValida.map((item) => {
      errorArray.push(item.msg);
    });

    req.flash("errors", errorArray);
    res.redirect("/host");

    return;
  }
  try {
    await host.register(req.body.username,req.body.address,req.body.phone,req.body.card,req.body.email,req.body.password)
    .then(
      data=>{
        errorArray.push(data)
        req.flash("errors",errorArray)
        return res.redirect("/host")
      }
     )} catch (error) {
    console.log(error)
    errorArray.push(error)
      req.flash("errors", errorArray);
      return res.redirect("/host");
  }
 
  };
 const postLogin = async(req,res)=>{
   var errorArray = [
     
   ]
   var email = req.body.email;
 var password = req.body.password;
 var userID = await HostModel.findByEmail(email);
 console.log(userID)
 if (!userID) {
     errorArray.push("email khong ton tai ")
     req.flash ("errors",errorArray)
     return res.redirect ("/login-host")
 }
 ;
 if (userID.local.email !== email) {
     res.send("email k dung");
     return
 }
 
 ;

 ;
 res.cookie("cookieAuth", userID._id)
 res.redirect("http://localhost:3000/host");
 
}
  //  var kq =  new Promise(async(resolve,reject)=>{
  //      await HostModel.findOne({email:email}).then(data =>{
  //       console.log(data)
  //       if(!data)
  //       {
  //         return reject (" email khong ton tai ")
  //       } 
  //       else if (data){
  //       return resolve("co email")
  //       }
  //     })
  //     });

    

module.exports ={
    postRegister:postRegister,
    getRegister:getRegister,
    getLogin:getLogin,
    postLogin :postLogin
  
}