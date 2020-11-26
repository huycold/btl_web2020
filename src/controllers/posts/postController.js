var userModel = require("./../../model/userModel")
let getPost =(req,res)=>{
  userModel.find({}).then(data=>{
        if(data){
          res.send(data)
        }
    })
}
module.exports = getPost
