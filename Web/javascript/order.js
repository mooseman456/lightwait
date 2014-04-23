var rootURL = "api/index.php";

$(document).ready(function(){
    getMenuData();

    $("#popup").click(function(){
        //document.getElementById('light').style.display='block';
        //document.getElementById('fade').style.display='block'
        //$("#light").show();
        //$("#fade").show();
        $("#light").fadeIn( 300 , null );
        $("#fade").fadeIn( 300 , null );

    });

    $("#popdown").click(function(){
        //document.getElementById('light').style.display='none';
        //document.getElementById('fade').style.display='none'
        $("#light").fadeOut( 300 , null );
        $("#fade").fadeOut( 300 , null );
    });

});



function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/ingredients",
        dataType: "json", // data type of response
        success: function(data){
            console.log($('title').html());
            if($('title').html().toLowerCase()=='order') {
                inflateOrderMenu(data);
            } else {
                console.log("ERROR: Could not load menu data for this page.");
            }
        }
    });
}

function inflateOrderMenu(data) {
    console.log(data);
    $('#menuForm').append("<h2>Choose Your Base</h2><ul id=\"basesMenu\">");  
    for (var i=0; i<data['Bases'].length; i++){
        if (data['Bases'][i]['available'] === '1')
            $('#menuForm ul:last-child').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i]['name'] + "\" value=\"" + data['Bases'][i]['name'] + "\" required> <label for=\"" + data['Bases'][i]['name'] + "\">" + data['Bases'][i]['name'] + "</label></li>");
    }
    $('#menuForm').append("<h2>Choose Your Bread</h2></ul><ul id=\"breadsMenu\">");
    for (var i=0; i<data['Breads'].length; i++){
        if (data['Breads'][i]['available'] === '1')
            $('#menuForm ul:last-child').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i]['name'] + "\" value=\"" + data['Breads'][i]['name'] + "\" required> <label for=\"" + data['Breads'][i]['name'] + "\">" + data['Breads'][i]['name'] + "</label></li>");
    }
    $('#menuForm').append("<h2>Slap Some Cheese On It</h2></ul><ul id=\"cheeseMenu\">");
    for (var i=0; i<data['Cheeses'].length; i++){
        if (data['Cheeses'][i]['available'] === '1')
            $('#menuForm ul:last-child').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i]['name'] + "\" value=\"" + data['Cheeses'][i]['name'] + "\" required> <label for=\"" + data['Cheeses'][i]['name'] + "\">" + data['Cheeses'][i]['name'] + "</label></li>");
    }
    $('#menuForm').append("<h2>Top It Off With Toppings</h2></ul><ul id=\"toppingsMenu\">");
    for (var i=0; i<data['Toppings'].length; i++){
        if (data['Toppings'][i]['available'] === '1')
            $('#menuForm ul:last-child').append("<li> <input type=\"checkbox\" name=\"toppingType[]\" id=\"" + data['Toppings'][i]['name'] + "\" value=\"" + data['Toppings'][i]['name'] + "\"> <label for=\"" + data['Toppings'][i]['name'] + "\">" + data['Toppings'][i]['name'] + "</label></li>");
    }
    $('#menuForm').append("<h2>Ya Want Fries With That?</h2></ul><ul id=\"fryMenu\">");
    for (var i=0; i<data['Fries'].length; i++){
        if (data['Fries'][i]['available'] === '1')
            $('#menuForm ul:last-child').append("<li> <input type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i]['name'] + "\" value=\"" + data['Fries'][i]['name'] + "\" required> <label for=\"" + data['Fries'][i]['name'] + "\">" + data['Fries'][i]['name'] + "</label></li>");
    }

    $('#menuForm').append("</ul><input type=\"submit\" value=\"Submit Order\">");

}