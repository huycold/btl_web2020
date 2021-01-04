import { check } from "express-validator/check";
import { errorRegister } from "./../lang/vi";
let register = [
  check("username","ten khong dung dinh dang")
  .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    )
  ,
  check("password", errorRegister.errorPassword).isLength({ min: 6 }),

  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  // ),
  check("confirm_password", errorRegister.errorConfirmPassword).custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
];

module.exports = {
  register: register,
};
