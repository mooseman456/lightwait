
var rootURL = "api/index.php"

$(document).ready(function(){
    getMenuData();
});

/************/
/*   AJAX   */
/************/
function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/menu",
        dataType: "json", // data type of response
        success: function(data){
            if($('title').html().toLowerCase()=='menu') {
                inflateAdminMenu(data);
            } else if($('title').html().toLowerCase()=='availability') {
                inflateChecMenu(data);
            } else {
                console.log("ERROR: Could not load menu data for this page.");
            }
        }
    });
}

function addIngredient(type, name) {
  $.ajax({
     type: 'POST',
     url: rootURL + '/ingredient/' + type + '/' + name,
     dataType: "json", // data type of response
     success: function(){
        console.log("Ingredient added");
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account creation failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}

/**************************/
/*   Inflater functions   */
/**************************/
function inflateAdminMenu(data) {

}

function inflateChecMenu(data) { 

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

    console.log("done inflating chef menu");

}
// function getMenuData() {
//     $.ajax({
//         type: 'GET',
//         url: rootURL+"/menu",
//         dataType: "json", // data type of response
//         success: function(data){

//             if(document.getElementsByClassName("mainForm").length>0){
//             loadAvailChart(data);
//             }  

//             $('#menuForm').append("<ul id=\"basesMenu\">");  
//             for (var i=0; i<data['Bases'].length; i++){
//                 $('#menuForm').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i] + "\" value=\"" + data['Bases'][i] + "\" required> <label for=\"" + data['Bases'][i] + "\">" + data['Bases'][i] + "</label></li>");
//             }
//             $('#menuForm').append("</ul><ul id=\"breadsMenu\">");
//             for (var i=0; i<data['Breads'].length; i++){
//                 $('#menuForm').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i] + "\" value=\"" + data['Breads'][i] + "\" required> <label for=\"" + data['Breads'][i] + "\">" + data['Breads'][i] + "</label></li>");
//             }
//             $('#menuForm').append("</ul><ul id=\"cheeseMenu\">");
//             for (var i=0; i<data['Cheeses'].length; i++){
//                 $('#menuForm').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i] + "\" value=\"" + data['Cheeses'][i] + "\" required> <label for=\"" + data['Cheeses'][i] + "\">" + data['Cheeses'][i] + "</label></li>");
//             }
//             $('#menuForm').append("</ul><ul id=\"toppingsMenu\">");
//             for (var i=0; i<data['Toppings'].length; i++){
//                 $('#menuForm').append("<li> <input type=\"checkbox\" name=\"toppingType\" id=\"" + data['Toppings'][i] + "\" value=\"" + data['Toppings'][i] + "\"> <label for=\"" + data['Toppings'][i] + "\">" + data['Toppings'][i] + "</label></li>");
//             }
//             $('#menuForm').append("</ul><ul id=\"fryMenu\">");
//             for (var i=0; i<data['Fries'].length; i++){
//                 $('#menuForm').append("<li> <input type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i] + "\" value=\"" + data['Fries'][i] + "\" required> <label for=\"" + data['Fries'][i] + "\">" + data['Fries'][i] + "</label></li>");
//             }

//             $('#menuForm').append("</ul><input type=\"submit\" value=\"Submit Order\">");

//         }

//    });

// }
