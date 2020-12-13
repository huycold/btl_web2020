var postModel = require("./../../model/postModel")
let getPost =(req,res)=>{
  postModel.find({}).then(data=>{
        if(data){
          res.send(data)
        }
    })
}
module.exports = {
  getPost :getPost
}
