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
   			for(var key in data){
      			$(".mainForm").append("<div></div>");
      			var currentItem=".mainForm div:last-child";
      			$(currentItem).append("<h2>"+key+"</h2>");
      			for(metaKey in data[key]){
         			var allPurpose=data[key][metaKey];
        			$(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
         			$(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"><br/>");
      			}
   			}
    	}
   });
}
//I don't think you need this.
function returnItem(ingredient, jsonObject){
   for(var i=0; i<jsonObject.length; i++){
      for(var k=1; k<jsonObject[i].length; k++){
         if(jsonObject[i][k].name===ingredient){
            return [i,k];
         }
      }
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
   }



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
      }*/