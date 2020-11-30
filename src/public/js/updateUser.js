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
        console.log(fileData)
    })
}
$(document).ready(function(){
    updateUserInfo()
})