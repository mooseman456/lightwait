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
            console.log(data, textStatus, jqXHR);
         },
         error: function(jqXHR, textStatus, errorThrown){
            console.log("Order upload failed");
            console.log(jqXHR, textStatus, errorThrown);
         }
      });
   }

   function formToJSON() {
      return JSON.stringify(
      {
       "bread" : "White",
       "base" : "Hamburger",
       "cheese" : "American",
       "topping" : "Lettuce",
       "timePlaced" : "2014-03-30 16:54:10",
       "user_id" : "1",
       "hasFries" : "1"
    });
   }

   $('#apiTestButton').click(function() {
      var json = formToJSON();
      postOrder(json);
   });   
});