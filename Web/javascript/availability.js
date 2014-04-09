var rootURL = "api/index.php";

$(document).ready(function(){
   getAvailableItems();
});
//Loads ingreidients int availability.php
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
      			for(var i=0; i<data[key].length; i++){
         			var allPurpose=data[key][i].name;
        			$(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
         			$(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"><br/>");
         			if(data[key][i].available==1){
            			var evil=$(currentItem+" input:nth-last-child(2)");
            			$(evil).prop("checked", true);
         			}
      			}
   			}
   			//On submit button, puts changed ingredients into checkedOn and CheckOff Array
   			$(".mainForm").append("<input id=\"availButton\" type=\"submit\">");
   			$("#availButton").click(function(){
   				var switchOn = new Array;
   				var switchOff = new Array;
   				var g=0;
   				for(var key in data){
   					g++;
         			for(var h=0; h<data[key].length; h++){
            			var inputPos="body > div > form > div:nth-child("+(g)+") > input:nth-child("+((h*3)+3)+")";
            			//console.log(data[key][h].name+",--- "+data[key][h].available+", ---"+$(inputPos).is(":checked"));
            			if(data[key][h].available!=$(inputPos).is(":checked")){
              				if(data[key][h].available==1)
              					switchOff.push(data[key][h].name);
              				if(data[key][h].available==0)
              					switchOn.push(data[key][h].name);
               				//console.log(switchOn);
               			}
               		}
               	}

   			});
    	}
   });
}


/*$(window).on("beforeunload", function() {
      for(var g=0;g<data.length; g++){
         for(var h=1; h<availTest[g].length; h++){
            var inputPos="body > div > form > div:nth-child("+(g+1)+") > input:nth-child("+(h*3)+")";
            console.log(availTest[g][h].name+",--- "+availTest[g][h].available+", ---"+$(inputPos).is(":checked"));
            if(availTest[g][h].available!==$(inputPos).is(":checked")){
               availTest[g][h].available=!availTest[g][h].available;
               console.log(availTest[g][h].available);
            }
         }
      }*/


//I don't think you need this.
function returnItem(ingredient, jsonObject){
   for(var key in data){
      for(var k=0; k<data[key].length; k++){
         if(data[i][k].name===ingredient){
            return [key, k];
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
   }*/



 