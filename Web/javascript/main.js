$(document).ready(function(){

   /*********************/
   /*   Populate HTML   */
   /*********************/
   //Populate order information from JSON
   //This displays ten orders from the order queue in the chef queue window
   //TODO: 1st step, static (update when you refresh the pagae)
   var orders;
   var currentPage=1;
   var maxPage=1;
   getActiveOrders();
   function getActiveOrders() {
      $.ajax({
         type: 'GET',
         url: "http://localhost/lightwait/Web/api/index.php/activeorders",
         dataType: "json", // data type of response
         success: function(data){  
            orders = data;
            console.log(data);
            //Set the base count values in the side bar
            //THIS IS OUTSIDE THE .ready()!!
            updateSidebar(orders);

            //Update order window
            //THIS IS INSIDE THE .ready()!!
            updateCurrentWindow();

            //Set the click listeners
            //THIS IS INSIDE THE .ready()!!
            setClickListeners();
         }
      });
   }
   console.log("UNDO COMMENTS");
   /*
   //waits for the names.csv to be successfully sent before running code
   client.onreadystatechange = function() {     
      if(client.readyState===4 && client.status===200){
         var doc=client.responseText;  //store text in doc
         orders=JSON.parse(doc);
         //console.log(client.responseText);
         
         //Set the base count values in the side bar
         //THIS IS OUTSIDE THE .ready()!!
         updateSidebar(orders);

         //Update order window
         //THIS IS INSIDE THE .ready()!!
         updateCurrentWindow();

         //Set the click listeners
         //THIS IS INSIDE THE .ready()!!
         setClickListeners();
      }
   };
   */
   
   /***********************/
   /*   Event Listeners   */
   /***********************/
   function setClickListeners() {
      //Set current and total page number
      //This should happen every time the page is change or 
      //TODO: that ^
      //Previous page arrow
      $('div.navigation img[alt~="Previous"]').click(function() {
         if (currentPage > 0)
            currentPage--;
         updatePagenumbers();
         updateCurrentWindow();
      });
      
      //Next page arrow
      $('div.navigation img[alt~="Next"]').click(function() {
         if(currentPage < Math.floor(orders.length)/8-1) {
            currentPage++;
         }
         updatePagenumbers();
         updateCurrentWindow();
      });

      //Recall button
      $("#recall").click(function() {
         console.log("You clicked the recall button");
         //TODO: Bring up the most recently bumped order
         //i.e. Retrieve from the database, the order most recently bumped
      });

      //Bump button
      /*
      $('.bump').click(function(event) {
         console.log("Bump");
         event.target.parentNode.remove();
         var index = event.target.parentNode.id.match(/order(\d)/)[1];
         orders.slice(index,index+1);
         pushOrderToWindow(9);
         //TODO
         //Order fill
         //Add the order to the bumped database (or whatever that is)
      });
      */
   }

   /*******************/
   /*   Avilability   */
   /*******************/
   var vClient = new XMLHttpRequest();     
   vClient.open('GET', '../Resources/sampleAvail.json', true);
   vClient.send();
   vClient.onreadystatechange = function() {     
      if(vClient.readyState===4 && vClient.status===200){
         loadAvailChat(vClient);
      }
   }

   /***********************/
   /*  Helper Funcitons   */
   /***********************/

   // Update current window
   function updateCurrentWindow() {
      $('div.window').empty();
      updatePagenumbers();
      for(var i=(currentPage-1)*8; i<currentPage*8 && i < orders.length; i++) {
         pushOrderToWindow(i);
      }
   }

   // Push order to window
   function pushOrderToWindow(index) {
      var orderId = orders[index].order_id;
      var timeStamp = orders[index].timePlaced;
      var orderElement = $('<section class="queue" id="order'+orderId+'"><h1>Order #'+orderId+'</h1><ul></ul></section>');
      $('div.window').append(orderElement);
      $.each(orders[index], function(key,val) {
         if ($.isArray(val)) {
            val.forEach( function(item) {
   
               $(orderElement.children('ul')).append('<li>'+item+'</li>');
            });
         } else {
            $(orderElement.children('ul')).append('<li>'+val+'</li>');
         }
      });
      orderElement.append('<button class="bump">Bump</button>');

      orderElement.children('button').click(function(event) {
         orderElement.remove();
         var index = event.target.parentNode.id.match(/order(\d)/)[1];
         console.log("index: "+index);
         orders.splice(index,1);
         //TODO: send this information to the database
         updatePagenumbers();
         updateCurrentWindow();
      });
   }

   // UPDATE PAGENUMBERS
   function updatePagenumbers() {
      $('#page_number').html((currentPage+1) + "/" + Math.floor(orders.length/8+1));
   }
});

// UPDATE SIDEBAR
// Takes an array of JSON orders
// Sets the number of bases in the side panel
// Returns nothing
function updateSidebar(orders) {
   var baseTypeCount = [];
   for(var i=0; i < orders.length; i++) {
      //If the base is not in baseTypeCount, add the key to baseTypeCount
      if( baseTypeCount[orders[i].Base] ){
         baseTypeCount[orders[i].Base] += 1;
      //Else, incrment that element
      } else {
         baseTypeCount[orders[i].Base] = 1;
      }
      // TODO:
      // Add the info in baseTypeCount to the html
   }
}


//loads in the availability json into html and checks available items
function loadAvailChat(vClient){
   availTest=JSON.parse(vClient.responseText);
   //console.log(availTest);

   for(var k=0; k<availTest.length; k++){
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



   $(".mainForm").append("<input class=\"submitAvail\" type=\"submit\" value=\"Update Availability\">");
   $(".mainForm input[type=\"submit\"]").click(function(event){
      event.preventDefault();
      for(var g=0;g<availTest.length; g++){
         for(var h=1; h<availTest[g].length; h++){
            var inputPos="body > div > form > div:nth-child("+(g+1)+") > input:nth-child("+(h*3)+")";
            console.log(availTest[g][h].name+",--- "+availTest[g][h].available+", ---"+$(inputPos).is(":checked"));
            //console.log($(inputPos));
            if(availTest[g][h].available!==$(inputPos).is(":checked")){
               availTest[g][h].available=!availTest[g][h].available;
               console.log(availTest[g][h].available);

            }

         }
      }

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


  
var rootURL = "http://localhost/lightwait/Web/api/index.php/menu";
getMenuData();
function getMenuData() {
   $.ajax({
      type: 'GET',
      url: rootURL,
      dataType: "json", // data type of response
      success: function(data){  
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
