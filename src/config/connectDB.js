import mongoose from "mongoose";
// import bluebird from "bluebird";
require("dotenv").config();
let connectDB = () => {
  // mongoose.Promise =bluebird;

  // let DB_CONNECTTION ="mongodb";
  // let DB_HOST ="localhost";
  // let DB_PORT ="27017";
  // let DB_NAME ="awesome_chat";
  // let DB_USERNAME ="";
  // let DB_PASSWORD ="";

  // let URI=`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}.${process.env.DB_CONNECTTION}`
  let URI = `mongodb://localhost/data`;
  return mongoose.connect(URI, { useMongoClient: true });
};
module.exports = connectDB;
