var likeSocket  = (io)=>{
    io.on("connection",(socket)=>{
        console.log("co ng ket noi")
     
        socket.on("senddata",(data)=>{
            console.log(data)
        })
    }
    )
}
module.exports  = likeSocket