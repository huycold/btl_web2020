let userAvatar = null;
let userInfo ={}
let originAvatar = null
let originUserInfo = {}
function updateUserInfo (){
    $("#input-change-avatar").bind("change",function(){
        let fileData = $("#input-change-avatar").prop("files")[0]
        let math = ["image/png","image/jpg","image/jpeg"]
        let limit =1048576;
        if($.inArray(fileData.type,math)=== -1){
            alert("kieu file khong hop le")
            $(this).val(null)
            return false
        }
        if(typeof(FileReader)!= undefined){
            let imagePreview = $("#image-edit-profile")
            imagePreview.empty()
            let fileReader = new FileReader()
            fileReader.onload = function(element){
                $("<img>",{
                    "src":element.target.result,
                    "class":"avatar img-circle",
                    "alt":"avatar",
                    "id":"user-modal-avatar"
                }).appendTo(imagePreview)
            }
            imagePreview.show()
            fileReader.readAsDataURL(fileData)
            let formData = new FormData
            formData.append("avatar",fileData)
            userAvatar = formData
        }
    })
    $("#input-change-username").bind("change",function(){
        userInfo.username = $(this).val()
    })
  
    $("#input-change-address").bind("change",function(){
        userInfo.address = $("#input-change-address").val()
    })
    $("#input-change-phone").bind("change",function(){
        userInfo.phone = $(this).val()
    })
}
function callUpdateAvatar(){
    $.ajax({
        url :"/user/update-avatar",
        type:"put",
        cache:false,
        contentType:false,
        processData:false,
        data:userAvatar,
        success:function(result){
       
       $(".user-modal-update-success").find("span").text("cap nhap thanh cong")
       $(".user-modal-update-success").css("display","block")
       $("#navbar-avatar").attr("src",result.imageSrc)
        },
        error:function(error){
             console.log("loi")
             $(".user-modal-update-errors").find("span").text("loi anh")
             $(".user-modal-update-errros").css("display","block")
            
          
            //  originAvatarSrc = result.imageSrc
          
            //  console.log(error)
            //  $("#input-btn-cancel-update-user").click()
        }
    })
}
function callUpdateUserInfo (){
   
    $.ajax({
        url :"/user/update-info",
        type:"put",
        
       data:userInfo,
        success:function(result){
          
       
        },
        error:function(error){
            console.log("cap nhap sai")
            $(".user-modal-update-success").find("span").text("cap nhap thanh cong")
            $(".user-modal-update-success").css("display","block")
              originUserInfo = Object.assign(originUserInfo,userInfo)
              console.log(originUserInfo)
              $("#navbar-username").text(originUserInfo.username)
          
        }
    })
}
$(document).ready(function(){
  
 

    originAvatar  = $("#user-modal-avatar").attr("src")
    originUserInfo ={
       username: $("#input-change-username").val(),
    //    gender : ($("#input-change-gender-male").is("checked"))?$("#input-change-gender-male").val(): $("#input-change-gender-female").val(),
       address: $("#input-change-address").val(),
       phone : $("#input-change-phone").val()
    }
   
    updateUserInfo()
   
   $("#input-btn-update-user").bind("click",function(){
    //    console.log(userAvatar)

  


       if(!userAvatar && $.isEmptyObject(userInfo)){
           alert(" ban phai thay doi ")
           return false;
       }
      
        callUpdateAvatar()
      
        callUpdateUserInfo ()
     
   
      
   })
   $("#input-btn-cancel-update-user").bind("click",function(){

    userAvatar = null;
   userInfo ={}
   $("#input-change-username").val(originUserInfo.username)
$("#input-change-address").val(originUserInfo.address)
$("#input-change-phone").val(originUserInfo.phone)
   $("#user-modal-avatar").attr("src",originAvatar)
 
   })
 
})