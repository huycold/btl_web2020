import userModel from "../../../model/userModel"
const homeController = (req, res) => {
  res.render("main/master",{
   user:req.user
  });
};
module.exports = {
  homeController: homeController,
};
