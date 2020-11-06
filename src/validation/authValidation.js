import { check } from "express-validator/check";
import { errorRegister } from "./../lang/vi";
let register = [
  check("email", errorRegister.errorEmail).isEmail(),
  check("password", errorRegister.errorPassword).isLength({ min: 6 }),

  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  // ),
  check("password_confirmation", errorRegister.errorConfirmPassword).custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
];

module.exports = {
  register: register,
};
