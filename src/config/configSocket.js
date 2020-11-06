import passportSocketIo from "passport.socketio"
// import cookieParser from "cookie-parser"
import session from "./session"
let configSocket =(io,cookieParser,sessionStore) =>{
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,       
        key:"express.sid",
        secret:"mySecret" ,
        store:sessionStore
     
      }));
}
module.exports = configSocket