$(document).ready(function(){
   var rootURL = "http://localhost:8888/lightwait/Web/api/index.php/menu";

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

   function postOrder() {
      console.log('addWine');
      $.ajax({
         type: 'POST',
         contentType: 'application/json',
         url: rootURL,
         dataType: "json",
         data: formToJSON(),
         success: function(data, textStatus, jqXHR){
            alert('Wine created successfully');
            $('#btnDelete').show();
            $('#wineId').val(data.id);
         },
         error: function(jqXHR, textStatus, errorThrown){
            alert('addWine error: ' + textStatus);
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
      console.log("clicked");
      //console.log(formToJSON);
   });   
}