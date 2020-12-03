import passport from "passport"
import passportLocal from "passport-local"
import UserModel from "./../../../model/userModel"
var LocalStrategy = passportLocal.Strategy;
var initPassportLocal = ()=>{
    passport.use("local",new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback:true
    },async(req,email,password,done)=>{
      
        let user =await UserModel.findByEmail(email)
        try {if(!user){
            return done(null,false,req.flash("errors","khong tim thay email"))
        }
           if(!user.local.isActive){
               return done(null,false,req.flash("errors","tai khoan chua duoc active"))
           }
           let checkPassword = user.comparePassword
           if(!checkPassword){
               return done (null,false,req.flash("errors","sai mat khau"))
           }
           return done(null,user,req.flash("success","dang nhap thanh cong"))
           
        }
           catch(error){
               return done(null,false,req.flash("errors","loi server"))
           }
    
       
           
        

    }


    
    ))
    passport.serializeUser((user,done)=>{
        return done(null,user._id)
    })
    passport.deserializeUser((_id,done)=>{
        UserModel.findUserById(_id)
        .then(user =>{
           return done(null,user) 
        })
        .catch(error =>{
            return done(error,null)
        })
    })
    
}
module.exports ={
    initPassportLocal:initPassportLocal
}
