import userModel from "./../../model/userModel"
const homeController = (req, res) => {
  console.log(req.user.role)
if(req.user.role ==="user")
{
  res.render("main/master",{
    user:req.user
   });
 
}
else if(req.user.role ==="admin"){
  res.send("hello admin")
}

  
};
module.exports = {
  homeController: homeController,
};
