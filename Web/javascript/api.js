$(document).ready(function(){

<<<<<<< HEAD
   var rootURL = "http://localhost/DBGUI_lightwait/Web/api/index.php/order";
=======
   var rootURL = "http://localhost:8888/lightwait/Web/api/index.php/order";
>>>>>>> 9cc72ad3d6182eb77c56fdf33edcfc549e25b1ce

   function getAllOrders() {
      $.ajax({
         type: 'GET',
         url: rootURL,
         dataType: "json", // data type of response
         success: function(data){   
            console.log(data);
         }
      });
   }

   function postOrder(json) {
      $.ajax({
         type: 'POST',
         contentType: 'application/json',
         url: rootURL,
         dataType: "json",
         data: json,
         success: function(data, textStatus, jqXHR){
            console.log("Order uploaded");
         },
         error: function(jqXHR, textStatus, errorThrown){
            console.log("Order upload failed");
            console.log(jqXHR, textStatus, errorThrown);
         }
      });
   }

   function formToJSON() {
      return JSON.stringify({
         "Base": "Hamburger", 
         "Bread": "White", 
         "Cheese": "Cheddar",
         "Toppings": "Lettuce"
         });
   }

   $('#apiTestButton').click(function() {
      var json = formToJSON();
      postOrder(json);
   });   
});