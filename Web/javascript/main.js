//var rootURL = "http://lightwait.alecsiems.com/Web/api/index.php";
var rootURL = "api/index.php";

$(document).ready(function(){
   //Why is this here?
});


//loads in the availability json into html and checks available items
function loadAvailChart(vClient){
   availTest=vClient;
   console.log(availTest);
   for(var key in availTest){
      $(".mainForm").append("<div></div>");
      var currentItem=".mainForm div:last-child";
      $(currentItem).append("<h2>"+key+"</h2>");
      for(metaKey in availTest[key]){
         var allPurpose=availTest[key][metaKey];
         $(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
         $(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"><br/>");
      `}
   }
}

   /*for(var k=0; k<availTest.length; k++){
      var category=availTest[k][0];
      $(".mainForm").append("<div class=\"avail\"></div>");
      var currentItem=".mainForm div:nth-child("+(k+1)+")";

      $(currentItem).append("<h2>"+category+"</h2>");
      for(var j=1; j<availTest[k].length; j++){
         var allPurpose=availTest[k][j].name;
         $(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
         $(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"></br>");

         if(availTest[k][j].available){
            var evil="body > div > form > div:nth-child("+(k+1)+") > input:nth-child("+(j*3)+")";
            $(evil).prop("checked", true);
         }
      }
   }*/



 $(window).on("beforeunload", function() {
      for(var g=0;g<availTest.length; g++){
         for(var h=1; h<availTest[g].length; h++){
            var inputPos="body > div > form > div:nth-child("+(g+1)+") > input:nth-child("+(h*3)+")";
            console.log(availTest[g][h].name+",--- "+availTest[g][h].available+", ---"+$(inputPos).is(":checked"));
            if(availTest[g][h].available!==$(inputPos).is(":checked")){
               availTest[g][h].available=!availTest[g][h].available;
               console.log(availTest[g][h].available);
            }
         }
      }
      //Send the json back to the server here!!!
   });
}

function returnItem(ingredient, jsonObject){
   for(var i=0; i<jsonObject.length; i++){
      for(var k=1; k<jsonObject[i].length; k++){
         if(jsonObject[i][k].name===ingredient){
            return [i,k];
         }
      }
   }
}

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
