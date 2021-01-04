

var currentPage = 1
function loadPage(page){
   currentPage = page
    $.ajax({
        url:`http://localhost:3000/address?search=caugiay&page=`+page,
        type:"GET"

    }).then(data =>{
        
        $("#content").html("")
        
        
           for(var i =0;i<data.data.length;i++){
               var element = data.data[i]
            var item = $(`
            <h2 class="title">${element.address}</h2>
            <div class="card"">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href=" ${"http://localhost"}:${3000}/${"getPostId"}/${element._id}" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
            `)
            $("#content").append(item)}
           
            

        // }
    
     
    })
   
}
function nextPage(){
    currentPage++;
    $.ajax({
        url:`http://localhost:3000/address?search=caugiay&page=`+currentPage,
        type:"GET"
    }).then(data =>{
        $("#content").html(" ")
        
        for(var i =0;i<data.data.length;i++){
            var element = data.data[i]
         var item = $(`
         <h2 class="title">${element.address}</h2>
         <div class="card"">
         <img src="..." class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">Card title</h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <a href=" ${"http://localhost"}:${3000}/${"getPostId"}/${element._id}" class="btn btn-primary">Go somewhere</a>
         </div>
         </div>
         `)
         $("#content").append(item)}
    })

}
function backPage(){
    currentPage--;
    $.ajax({
        url:`http://localhost:3000/address?search=caugiay&page=`+currentPage,
        type:"GET"
    }).then(data =>{
        $("#content").html(" ")

        for(var i =0;i<data.data.length;i++){
            var element = data.data[i]
         var item = $(`
         <h2 class="title">${element.address}</h2>
         <div class="card"">
         <img src="..." class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">Card title</h5>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <a href=" ${"http://localhost"}:${3000}/${"getPostId"}/${element._id}" class="btn btn-primary">Go somewhere</a>
         </div>
         </div>
         `)
         $("#content").append(item)}
    })

}
$(document).ready(function(){
    
loadPage(1)

})