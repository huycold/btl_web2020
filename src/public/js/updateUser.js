let userAvatar = null;
let userInfo ={}
let originAvatar = null
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
    $("#input-change-gender-male").bind("change",function(){
        userInfo.gender = $(this).val()
    })
    $("#input-change-female").bind("change",function(){
        userInfo.female = $(this).val()
    })
    $("#input-change-address").bind("change",function(){
        userInfo.address = $(this).val()
    })
    $("#input-change-phone").bind("change",function(){
        userInfo.phone = $(this).val()
    })
}
$(document).ready(function(){
    updateUserInfo()
    originAvatar  = $("#user-modal-avatar").attr("src")
   $("#input-btn-update-user").bind("click",function(){
    //    console.log(userAvatar)
    //    console.log(userInfo)
       if(!userAvatar && $.isEmptyObject(userInfo)){
           alert(" bab phai thay doi ")
           return false;
       }
       $.ajax({
           url :"/user/update-avatar",
           type:"put",
           cache:false,
           contentType:false,
           processData:false,
           data:userAvatar,
           success:function(result){
          
            $("#user-modal-update-success").find("span").text(result.message)
            $("#user-modal-update-success").css("display","block")
            $("#navbar-avatar").attr("src",result.imageSrc)
         
            originAvatarSrc = result.imageSrc
            alert("ban da cap nhap thanh cong")
            console.log(result)
           },
           error:function(error){
                $("#user-modal-update-errors").find("span").text(error.responseText)
                $("#user-modal-update-errors").css("display","block")

           }
       })
   })
   $("#input-btn-cancel-update-user").bind("click",function(){
    userAvatar = null;
   userInfo ={}
   $("#user-modal-avatar").attr("src",originAvatar)
  
   console.log(userAvatar)
   console.log(userInfo)
   })
 
})