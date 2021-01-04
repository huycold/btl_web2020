function callFindUsers(element){
    if(element.which === 13||element.type==="click"){
        let keyword =$("#input-find-users-contact").val()
        
        if(!keyword.length){
            alertify.notify("Chua nhap doi dung tim kiem","error",7)
            return false
        }
        console.log(keyword)
       
             $.ajax({
            url:"/search/findAddress/?keyword="+keyword,
            method:"GET",
            
            success:(result)=>{
                console.log("dung")
            },
            error:(error)=>{
                
            }

        }).then(data=>{
            if(data.length===0){
                alert("khong co ")
            }
            const container = document.getElementById('container');
            container.innerHTML=''
          
 
            const loading = document.querySelector('.loading');

                    getPost();
                    getPost();
                    getPost();
                    getPost();
                    window.addEventListener('scroll', () => {
                    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;


                    if(clientHeight + scrollTop >= scrollHeight - 5) {
                    // show the loading animation
                    showLoading();
                    }
                    });

                    function showLoading() {
                    loading.classList.add('show');

                    // load more data
                    setTimeout(getPost, 1000)
                    }

                    async function getPost() {
                   

                    // addDataToDOM(data[0].address)
                    for(var  i =0;i < data.length ;i ++ ){
                    addDataToDOM(data[i])
                    }
                }
                    function addDataToDOM(data) {
                    console.log("data" + data)
                    const postElement = document.createElement('div');
                   
                    postElement.innerHTML = `
                    <h2 class="title">${data.address}</h2>
                    <div class="card"">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href=" ${"http://localhost"}:${3000}/${"getPostId"}/${data._id}" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>

                    `;
                    container.appendChild(postElement);

                    loading.classList.remove('show');
                  
                    }
                 } )
    }}
$(document).ready(function(){
    
    $("#input-find-users-contact").bind("keypress",callFindUsers)
    $("#btn-find-users-contact").bind("click",callFindUsers)
}
)