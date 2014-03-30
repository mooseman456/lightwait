$(document).ready(function(){

   var rootURL = "http://localhost/lightwait/Web/api/index.php";

   function postOrder(json) {
      $.ajax({
         type: 'POST',
         contentType: 'application/json',
         url: rootURL + "/order",
         dataType: "json",
         data: json,
         success: function(data, textStatus, jqXHR){
            console.log("Order uploaded");
            console.log(data, textStatus, jqXHR);
         },
         error: function(jqXHR, textStatus, errorThrown){
            console.log("Order upload failed");
            console.log(jqXHR, textStatus, errorThrown);
         }
      });
   }

   function formToJSON() {
      return JSON.stringify({
         "user_id" : "25",
         "timePlaced" : "2014-03-029 12:04:01",
         "isActive" : "1",
         "base": "Hamburger", 
         "bread": "White", 
         "cheese": "Cheddar",
         "toppings": [ "Pineapple", "Jalapeno", "Lettuce", "Chipotle Ranch" ],
         "fries": "Regular"
         });
   }

   $('#apiTestButton').click(function() {
      var json = formToJSON();
      postOrder(json);
   });   
});