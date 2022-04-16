
$(function(){
    
    LoadReceipies();
    $("#recepies").on("click",".btn-danger",handlesubmit);
    $("#addbtn").click(addRecipe);
    $("#recepies").on("click",".btn-warning",UpdateReceipt);
    $("#updateSave").click(function(){
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/" + id,
            data:{title,body},
            method:"PUT",
            success:function(respose){
                
                // $("#updateModal").modal("hide");
                
                console.log(respose); 
                LoadReceipies();
            }
    });
});
});



function UpdateReceipt(){
    var btn = $(this)
    parentDiv = btn.closest(".recepie")
    var id = parentDiv.attr("data-id")
    

    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+ id, function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModel").modal("show");
    });

    
}

function addRecipe(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes",
        method : "POST",
        data : {title,body},
        success : function(response){
            console.log(response);
            LoadReceipies();
        }
    });

}

function handlesubmit(){
    var btn = $(this)
    parentDiv = btn.closest(".recepie")
    id = parentDiv.attr("data-id")
    
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success : function(){
            
            LoadReceipies();
        }
    });
}






function LoadReceipies(){
    $.ajax({
        url : "https://usman-recipes.herokuapp.com/api/recipes",
        method : "GET",
        success : function(response){
            console.log(response);
            var recepies = $("#recepies");
            recepies.empty();
            for(var i = 0; i < response.length; i++){
                var res = response[i];
                recepies.append(`<div class="recepie" data-id=${res._id}>  <h3>${res.title}</h3>  <p><button class="btn btn-danger btn-sm float-right">Delete</button>  <button class="btn btn-warning btn-sm float-right">edit</button>${res.body} </p>  </div>`)
            }


    }
});

}
