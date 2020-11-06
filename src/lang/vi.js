import { link } from "fs-extra";

export const errorRegister = {
  errorEmail: "email loi",
  errorPassword: "mat khau nhap khong hop le",
  errorConfirmPassword: "mat khau nhap lai khong dung",
};
export const transMail = {
  template: (linkVerify) => {
    return `
    <h3>Vui long click ben duoi de xac thuc tai khoan</h3>
    <h3> <a href="${linkVerify}" target="blank"> ${linkVerify}</h3>
    `;
  },
};
