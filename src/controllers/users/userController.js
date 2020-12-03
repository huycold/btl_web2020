import multer from "multer";
import {app} from "./../../config/app"
import { validationResult } from "express-validator/check";
import uuidv4 from "uuid/v4"
import fsExtra from "fs-extra"

import {user} from "./../../servies/index"
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
module.exports={
    updateAvatar:updateAvatar,
    updateInfo :updateInfo
}