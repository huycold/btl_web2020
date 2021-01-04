var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let Schema = mongoose.Schema;
let HostSchema = new Schema({
  username: String,
  
  phone: { type: Number, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "admin" },
  card :{
    type:String
  },
  birthday:{
    type:Date
  },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String,
  },
  
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, defauld: null },
  deletedAt: { type: Number, default: null },
});
HostSchema.statics = {
    createNew(item) {
      return this.create(item);
    }
    ,
      updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
      },
      findByEmail(email) {
        return this.findOne({ "local.email": email }).exec();
      },
      findUserById(_id) {
        return this.findById(_id).exec();
      }
}
HostSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password); // return promise so sanh password
  },
};
var HostModel = mongoose.model("hosts", HostSchema);

// UserModel.find().then((data)=>{
//     console.log(data)
// })

module.exports = HostModel;