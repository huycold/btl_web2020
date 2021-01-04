import hostModel from "../model/hostModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
// import {transSuccess} from "./../../lang/vi"
import sendMail from "./../config/mailer";
import { transMail } from "./../lang/vi";
import { reject, resolve } from "bluebird";


let saltRounds = 7;
let register = (username,address,phone,card,email, password) => {
  return new Promise(async (resolve, reject) => {
    let hostByEmail = await hostModel.findByEmail(email);
    if (hostByEmail) {
      {
        if (!hostByEmail.local.isActive) {
          return reject("tai khoan chua duoc active");
        }
      }
      return reject("da ton tai email");
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let hostItem = {
      username: username,
    address:address,
    phone:phone,
    card:card,

      local: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        verifyToken: uuidv4(),
      },
    };
    let host = await hostModel.create(hostItem).then(
      data =>{
        if(data){
          return resolve("tai khoan ban duoc tai vui long den co quan de active")
        }
      }
    )
  ;
  });
};

module.exports = {
  register: register,
  
};
