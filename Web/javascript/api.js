$(document).ready(function(){

   var rootURL = "http://localhost:8888/lightwait/Web/api/index.php/order";

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
         "user_id" : "1",
         "hasFries" : "1",
         "timePlaced" : "2014-03-029 12:04:01",
         "isActive" : "1",
         "base": "Hamburger", 
         "bread": "White", 
         "cheese": "Cheddar"
         });
   }

   $('#apiTestButton').click(function() {
      var json = formToJSON();
      postOrder(json);
   });   
});