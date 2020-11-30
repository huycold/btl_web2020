var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let Schema = mongoose.Schema;
let PostSchema = new Schema({
  address:String,
  
publicPlaces:String,
room:String,
numberRoom:Number,

acreage:Number,
withHost:Boolean,
createBy:String,
infrastructure:String,
images: { type: String },
createdAt: { type: Number, default: Date.now },
updatedAt: { type: Number, defauld: null },
deletedAt: { type: Number, default: null },


});
PostSchema.statics = {
    createNew(item) {
      return this.create(item);
    }
}
var PostModel = mongoose.model("post", PostSchema);
PostModel.create({
    address:"an thanh",
  
    publicPlaces:" xa cong",
}).then((data)=>{
    console.log(data)
})
// UserModel.find().then((data)=>{
//     console.log(data)
// })

module.exports = PostModel;