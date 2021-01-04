import userModel from "./../../model/userModel"
const homeController = (req, res) => {
 
if(req.user.role ==="user")
{
  res.render("main/master",{
    user:req.user,
    success:["truomn"],
    errors:req.flash("errors")
   });
 
}


  
};
module.exports = {
  homeController: homeController,
};