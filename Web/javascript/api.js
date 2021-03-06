$(document).ready(function(){

   var rootURL = "api/index.php";

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

   function updateOrder(id) {
      console.log(id);
      $.ajax({
         type: 'PUT',
         contentType: 'application/json',
         url: rootURL + "/" + id,
         dataType: "text",
         data: id,
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
       "bread" : "White",
       "toppings" : [
                      "Lettuce",
                      "Bacon",
                      "Jalapeno"
                      ],
       "base" : "Turkey",
       "cheese" : "American",
       "fries" : "Regular",
       "timePlaced" : "2014-03-30 17:37:25",
       "user_id" : "1"
    });
   }

   $('#apiTestButton').click(function() {
      //var json = formToJSON();
      updateOrder(1);
   });   
});