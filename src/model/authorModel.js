var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let Schema = mongoose.Schema;
let Authorchema = new Schema({
    username:String

    
})
let AuthorModel = mongoose.model("Authors",Authorchema)
AuthorModel.create({
  username:"huy"
  
}).then(data=>{
  console.log(data)
})



module.exports = AuthorModel