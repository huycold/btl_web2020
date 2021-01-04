import multer from "multer";
import {app} from "./../../config/app"
import { validationResult } from "express-validator/check";
import uuidv4 from "uuid/v4"
import fsExtra from "fs-extra"
import { check } from "express-validator/check";
import bcrypt from "bcrypt"
import {user} from "./../../servies/index"
import UserModel from "./../../model/userModel"
import passport from "passport"
import { reject, resolve } from "bluebird";
import connectFlash from "connect-flash";

let storageAvatar =multer.diskStorage({

  destination:(req,file,callback)=>{
      callback(null,"src/public/images/users")
  }  ,
  filename:(req,file,callback)=>{
      let math =["image/png","image/jpg","image/jpeg"] ;
      if(math.indexOf(file.minetype)=== -1){
        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`
        callback (null,avatarName)
  }
        }
       
})
let avatarUploadFile =multer({
    storage:storageAvatar,
    limits:{fileSize:180576}
}).single("avatar")
let updateAvatar =(req,res)=>{
    avatarUploadFile(req,res,async(error)=>{
        if(error){
            console.log(error)
        }
        try {
           
            let updateUserItem ={
                avatar:req.file.filename,
                updateAt:Date.now()
            } 
        let userUpdate= await user.updateUser(req.user._id,updateUserItem)
            await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`)
            let result={
                message:"cap nhap dung"
               ,
                imageSrc:`/images/users/${req.file.filename}`
            }
            return  res.status(200).send(result)
        } catch (error) {
          console.log(error)
        }
    })
}
let updateInfo = async(req,res)=>{
    let errorArray = [];
    let successArray = [];
  
    let errorValida = Object.values(validationResult(req).mapped());
    if (errorValida.length > 0) {
      errorValida.map((item) => {
        errorArray.push(item.msg);
      });
  
      
      return res.status(500).send("loi")
  
      return;
    }
    try {
        let updateUserItem = req.body
  
         await user.updateUser(req.user._id,updateUserItem)
    } catch (error) {
        console.log(error)
    }
}

let changePassword = (req,res)=>{
    let errorArray =[];
    let successArray = [];
    var current_password = req.body.current_password;
   
    var new_password = req.body.new_password
    var confirm_new_password = req.body.confirm_new_password
    UserModel.find({}).then(data=>{
       return new Promise((resolve,reject)=>{
        bcrypt.compare(current_password,data[0].local.password,async function(error,result){
            if(result === true) {
                if(new_password ===confirm_new_password){
                    if(new_password.length >=6){
                        const salt = bcrypt.genSaltSync(10);
                      var password =   bcrypt.hashSync(new_password, salt)
                       await UserModel.findByIdAndUpdate(req.user._id,{
                           "local.password":password
                       },(error,user)=>{
                        //    
                        if(user){
                            successArray.push("cap nhap mat khau thanh cong")
                            req.flash("success", successArray);
                        }
                       })
                   

                    }
                    else 
                    {
                        successArray.push("mat khau khong hop ly")
                        req.flash("success", successArray);
                    }
                }
                else{
                  successArray.push("mat khau confim chua dung")
                  req.flash("success", successArray);
                 
                }
            }
            else {
            
         successArray.push("mat khau khong dung")
         req.flash("success", successArray);
        
          
            }
        });

       }) 
    })
    // userModel.find({
    //     password: bcrypt.compare( hash, function(err, result) {
    // }).then(
    //     data=>{
    //         console.log(data)
    //     }
    // )
}

module.exports={
    updateAvatar:updateAvatar,
    updateInfo :updateInfo,
    changePassword:changePassword
}