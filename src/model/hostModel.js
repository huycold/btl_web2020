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
}
var HostModel = mongoose.model("host", HostSchema);

// UserModel.find().then((data)=>{
//     console.log(data)
// })

module.exports = HostModel;