import nodemailer from "nodemailer";

const sendMail = (to, subject, template) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });
  var mailOptions = {
    from: "",
    to: to,
    subject: subject,
    text: template,
  };
  return Promise.resolve(
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    })
  );
};
export default sendMail;
