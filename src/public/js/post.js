// const socket = io()

function like (){
    $("#button_like").click(function(){
        $.ajax({
            url: "like_post",
            method:"put",
            success:function(){
                console.log("da gui ")
            }
      
    
    })
})
}

//   $.jax({
//       url:"/luotxem/:id",
//       method:PUT
//   }).then(data=>{
//       console.log(data)
//   })
  

$(document).ready(function(){
    like()
 
})