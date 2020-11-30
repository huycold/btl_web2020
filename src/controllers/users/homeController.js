import userModel from "./../../model/userModel"
const homeController = (req, res) => {
 
if(req.user.role ==="user")
{
  res.render("main/master",{
    user:req.user,
    success:["xin chao ban"],
    errors:req.flash("errors")
   });
 
}
else if(req.user.role ==="admin"){
  res.render("hosts/master")
}

  
};
module.exports = {
  homeController: homeController,
};
