// import userModel from "./../model/userModel";
// import bcrypt from "bcrypt";
// import uuidv4 from "uuid/v4";

// import UserModel from "./../model/userModel";
// import sendMail from "./../config/mailer";
// import { transMail } from "./../lang/vi";
// const saltRounds = 10;
// let register = (email, male, password, protocol, host) => {
//   return new Promise(async (resolve, reject) => {
//     let userByEmail = await UserModel.findByEmail(email);

//     if (userByEmail) {
//       if (!userByEmail.local.isActive) {
//         return reject("tai khoan chua duoc active");
//       }
//       return reject("da co email");
//     }

//     const salt = bcrypt.genSaltSync(saltRounds);
//     let userItem = {
//       username: email.split("@")[0],
//       gender: male,
//       password: bcrypt.hashSync(password, salt),
//       local: {
//         email: email,
//         verifyToken: uuidv4(),
//       },
//     };
//     let user = await userModel.create(userItem);
//     let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;

//     sendMail(email, "xac thuc mail ", transMail.template(linkVerify))
//       .then((success) => {
//         return resolve(
//           "tai khoan duoc tao thanh cong vui long check email de kich hoat"
//         );
//       })
//       .catch((error) => {
//         return reject("gui loi email");
//       });
//   });
// };
// module.exports = {
//   register: register,
// };
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
var mongoose = require("mongoose")
// import {transSuccess} from "./../../lang/vi"
import sendMail from "./../config/mailer";
import { transMail } from "./../lang/vi";
import { reject, resolve } from "bluebird";
import UserModel from "../model/userModel";

let saltRounds = 7;
let register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, reject) => {
    let userByEmail = await userModel.findByEmail(email);
    if (userByEmail) {
      {
        if (!userByEmail.local.isActive) {
          return reject("tai khoan chua duoc active");
        }
      }
      return reject("da ton tai email");
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      _id: new mongoose.Types.ObjectId(),
      username: email.split("@")[0],
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuidv4(),
      },
    };
    let user = await userModel.create(userItem);
    let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;

    await sendMail(email, "xac thuc tai khoan", transMail.template(linkVerify))
      .then((success) => {
        resolve("tai khoan duoc tao kiem tra email");
      })
      .catch(async (error) => {
        console.log(error);
        // reject(transMail.send_failed)
      });
  });
};
let verifyToken = (token) => {
  return UserModel.verifyToken(token);
};
module.exports = {
  register: register,
  verifyToken: verifyToken,
};
