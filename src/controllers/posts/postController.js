import { reject, resolve } from "bluebird";
import userModel from "./../../model/userModel"
var postModel = require("./../../model/postModel")
const page_size = 2;
let getPost =(req,res)=>{
  postModel.find({}).then(data=>{
        if(data){
          res.send(data)
        }
    })
}
let getPostId  =(req,res)=>{
  var id = req.params.id
  
  postModel.find({_id:id }).then (async  data =>{
   
    if(data){
     
      console.log(data[0])
      res.render("post/master",{
     
        post:data[0],
        user:req.user
      })
      var view= data[0].luotxem +=1;
       await postModel.updateOne({luotxem:view})
      
    }
  })
 
 
}
let putLike = (req,res)=>{
  var idUser = req.user._id
  
   var id = req.params.id;
   postModel.find({_id:id}).then(
     data=>{
      data[0]._doc.like.map(item=>{
        if(item === idUser)
        console.log("da like")
      })
     }
   )
 
}
let searchAddress = (req,res)=>{
  var search = req.query.search;
  var page = req.query.page

  var dataArray = {}

  postModel.find({
    publicPlaces:search

  }).then(data=>{
  
    if(data){
      if(page){
        page = parseInt(page)
        var skip = (page - 1) *page_size
        postModel.find({
          publicPlaces:search
        })
        .skip(skip)
        .limit(page_size)
        .then(data=>{
  
        dataArray.data = data;
        dataArray.search = search
        dataArray.page = page
        res.json(dataArray)
       
         })
     
      }
    }
  })
    
  
}
let getAddress = (req,res)=>{

   let keyword = req.query.keyword;
   if(keyword==="hoankiem")
   {
   res.render("post/district/hoankiem",{
   }
  )}
  if(keyword==="caugiay")
  {
   res.render("post/district/caugiay",{
   }
  )}
  if(keyword==="badinh"){
   res.render("post/district/badinh",{
   }
  )}

  if(keyword==="haibatrung"){
   res.render("post/district/haibatrung",{
   }
  )}
  if(keyword==="hadong"){
   res.render("post/district/hadong",{
   }
  )}
}

let getFindAddress =(req,res)=>{
  var address = req.query.keyword;
  if(address){
    var dataArray = []
    postModel.find({
      publicPlaces:address
    }).then(data=>{
      res.json(data)
    })
}//  



}
let getView =(req,res)=>{
  var id = req.params.id;
  postModel.find({_id:id}).then(async  data=>{
    if(data){
   
     var view= data[0].luotxem +=1;
   res.json(view)
    await postModel.updateOne({luotxem:view})
    
    
  }})
}
function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
let postComment =(req,res)=>{

var id=req.params.id;
var idUser = req.params.idUser
var comment = req.body.comment

userModel.find({
  _id:idUser
}).then(data=>{
 
  if(data.length > 0){
    var option ={
      comment:"ad",
      isActive:true
    }
    postModel.find({_id:id})
    .populate("comment")
    .then(data=>{
      res.json(data)
    })
      // postModel.findByIdAndUpdate(
      //   id,option,
      //   {new:true},
      //   (error,user)=>{
      //     res.json(user)
      //   }
      // )
      
    }
})  


// postModel.find({
//   _id:id
// }).then(async data=>{
//   if(data){
 
//     var commentArray = data[0].comment
    
//    commentArray.push(comment)
//   //  console.log(commentArray)
//    await postModel.update({
//       comment:commentArray,
//     })
//   }
// })
}
let listRoom = (req,res)=>{
  
  var id = req.params.id
  var idUser = req.params.idUser
  var array = []
  userModel.find({
    _id:idUser
  }).then(async data=>{
    if(data.length > 0){
      array = data[0].listRoom;
      array.push(id)
      console.log(array[1])
   await userModel.findByIdAndUpdate(idUser,{
    listRoom:array}
  )
      

    }
  }
    )
}
module.exports = {
  getPost :getPost,
  getPostId:getPostId,
  searchAddress:searchAddress,
  putLike:putLike,
  getAddress:getAddress,
  getFindAddress:getFindAddress,
  getView:getView,
  postComment:postComment,
  listRoom :listRoom
}
