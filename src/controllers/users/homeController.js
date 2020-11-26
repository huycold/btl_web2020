import userModel from "./../../model/userModel"
const homeController = (req, res) => {
 
if(req.user.role ==="user")
{
  res.render("main/master",{
    user:req.user
   });
 
}
else if(req.user.role ==="admin"){
  res.render("main/masterHost")
}

  
};
module.exports = {
  homeController: homeController,
};
