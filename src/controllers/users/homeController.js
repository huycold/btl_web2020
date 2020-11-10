import userModel from "./../../model/userModel"
const homeController = (req, res) => {
  var account = req.account;
console.log(account)
  res.render("main/master",{
   user:req.user
  });
};
module.exports = {
  homeController: homeController,
};
