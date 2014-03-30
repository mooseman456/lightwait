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
      var json = formToJSON();
      postOrder(json);
   });   
});