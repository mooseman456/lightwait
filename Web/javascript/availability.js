var rootURL = "api/index.php";

$(document).ready(function(){
   getAvailableItems();
});

function getAvailableItems() {
   $.ajax({
      type: 'GET',
      url: rootURL+"/ingredients",
      dataType: "json", // data type of response
      success: function(data){
         console.log(data);
      }

   });
}