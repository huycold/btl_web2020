var mongoose = require("mongoose")
var author =require("./userModel")
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let Schema = mongoose.Schema;
let PostSchema = new Schema({
luotxem:Number,
address:String,
price:Number,
dientich:Number,
loaiphong:String,
soluong:Number,
withHost:Boolean,
host:{
  type: Schema.Types.ObjectId, ref: 'user'
},
like:[{type: Schema.Types.ObjectId, ref: 'user'}],
phongtam:[],
giadien:Number,
gianuoc:Number,
avatar: [
  { type: String, default: "avatar-default.jpg" }
],


createdAt: { type: Number, default: Date.now },
updatedAt: { type: Number, defauld: null },
deletedAt: { type: Number, default: null },


});
var post = mongoose.model("posts",PostSchema)

// post.create({
//   like:["5fe2e733a096822a84d8f2cd"],
//   luotxem:5
// })
// post.
//   find({_id:"5fe344c3d8ad400ff43a762a"})
//   .populate("like")
//   .then(data=>{
//     console.log(data[0]._doc.like[0].username)
//   })
  // populate('like').
  

// post.create({
//   luotxem:6,
// address:"ngo 20 Ho tung mau",
// price:3000,
// dientich:20,
// loaiphong:"kep kin",
// soluong:6,
// host:"5fe37e8beff1f30594b4a397",
// withHost:true,
// phongtam:["sach dep",""],
// giadien:30,
// gianuoc:20,
// }).then(data =>{
//   console.log(data)
// })
// post.create({
//   like :author._id,
//   room:"ok"
// }).then(data=>{
//   console.log(data)
// })
// PostModel.
//   findOne({ _id: '5fe2720b4330630398758b23' }).
//   populate('author').
//   exec(function (err, user) {
//     if (err) return handleError(err);
//     console.log('The author is %s', user);
//     // prints "The author is Ian Fleming"
//   });
// PostModel.find({_id:"5fdd2829fb93b927f401b31e"})
// .populate("5fdd2971e24d862214f4c894")
// .exec(function(error,data){
//   console.log(data.comments)
// })
// PostModel.create({
//   address:"ngõ 20 ",
  
//   publicPlaces:"epu",
//   room:3,
//   numberRoom:4,
//   comments:"5fdd224f0244482030766ee2"
// }).then(data=>{
//   console.log(data)
// })

  
//   acreage:6,
//   withHost:true,
//   createBy:"Truong Van Huy ",

//   images: ["https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg"],
//   comment:["5fdd224f0244482030766ee2"],
//   like : 3 ,

// }).then(data=>{
//   console.log(data)
// })

//   address:"ngõ 20 my dinh",
  
//   publicPlaces:"VNU",
//   room:3,
//   numberRoom:4,
  
//   acreage:6,
//   withHost:true,
//   createBy:"Truong Van Huy ",

//   images: ["https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg"],
//   comment:["nha dep","sach dep"],
//   like : 3 
// },{
//   address:"ngõ 20 hoang quoc viet",
  
//   publicPlaces:"VNU",
//   room:3,
//   numberRoom:4,
  
//   acreage:6,
//   withHost:true,
//   createBy:"Truong Van Huy ",

//   images: ["https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg","https://tin247.com.vn/wp-content/uploads/2019/12/img_5dfda73271ca9-1.jpg"],
//   comment:["nha dep","sach dep"],
//   like : 3 
// }).then((data)=>{
//     console.log(data)
// })

module.exports = post;