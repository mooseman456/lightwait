//var rootURL = "http://lightwait.alecsiems.com/Web/api/index.php";
var rootURL = "api/index.php";

$(document).ready(function(){
    
    //Logout click listener
    $('a[href="index.php"]').click( function()  {
        alert('logout');
    });
});


getMenuData();
function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/menu",
        dataType: "json", // data type of response
        success: function(data){

            if(document.getElementsByClassName("mainForm").length>0){
            loadAvailChart(data);
            }  

            $('#menuForm').append("<ul id=\"basesMenu\">");  
            for (var i=0; i<data['Bases'].length; i++){
                $('#menuForm').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i] + "\" value=\"" + data['Bases'][i] + "\" required> <label for=\"" + data['Bases'][i] + "\">" + data['Bases'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"breadsMenu\">");
            for (var i=0; i<data['Breads'].length; i++){
                $('#menuForm').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i] + "\" value=\"" + data['Breads'][i] + "\" required> <label for=\"" + data['Breads'][i] + "\">" + data['Breads'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"cheeseMenu\">");
            for (var i=0; i<data['Cheeses'].length; i++){
                $('#menuForm').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i] + "\" value=\"" + data['Cheeses'][i] + "\" required> <label for=\"" + data['Cheeses'][i] + "\">" + data['Cheeses'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"toppingsMenu\">");
            for (var i=0; i<data['Toppings'].length; i++){
                $('#menuForm').append("<li> <input type=\"checkbox\" name=\"toppingType\" id=\"" + data['Toppings'][i] + "\" value=\"" + data['Toppings'][i] + "\"> <label for=\"" + data['Toppings'][i] + "\">" + data['Toppings'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"fryMenu\">");
            for (var i=0; i<data['Fries'].length; i++){
                $('#menuForm').append("<li> <input type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i] + "\" value=\"" + data['Fries'][i] + "\" required> <label for=\"" + data['Fries'][i] + "\">" + data['Fries'][i] + "</label></li>");
            }

            $('#menuForm').append("</ul><input type=\"submit\" value=\"Submit Order\">");

        }

   });

}
