var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let Schema = mongoose.Schema;
let Commentchema = new Schema({
    title:String,
   author:{
     type: Schema.Types.ObjectId, ref: 'Authors' 
   },
    isActive:{
      type:Boolean,
      default:false
    }

    
})
let CommentModel = mongoose.model("comments",Commentchema)
// CommentModel.create({
//   title:"xin chao",
//   author :"5fdd2e63542763284c441e09"
  
// }).then(data=>{
//   console.log(data)
// })
CommentModel.find({})
.populate("Authors")
.then(data=>{
  console.log(data.author)
}
)




module.exports = CommentModel