$(document).ready(function(){


   /*********************/
   /*   Populate HTML   */
   /*********************/
   //Populate order information from JSON
   //This displays ten orders from the order queue in the chef queue window
   //TODO: 1st step, static (update when you refresh the pagae)
   var client = new XMLHttpRequest();     
   client.open('GET', '../Resources/SampleOrderData.json', true);
   client.send();
   var orders;
   //var orderHTML = [];
   var numOrders=0;
   var currentPage=0;
   var maxPage=0;
   //waits for the names.csv to be successfully sent before running code
   client.onreadystatechange = function() {     
      if(client.readyState===4 && client.status===200){
         var doc=client.responseText;  //store text in doc
         orders=JSON.parse(doc);
         
         //Set the base count values in the side bar
         //THIS IS OUTSIDE THE .ready()!!
         updateSidebar(orders);

         //Update order window
         //THIS IS INSIDE THE .ready()!!
         updateCurrentWindow();
      }
   };
   
   /***********************/
   /*   Event Listeners   */
   /***********************/
   //Set current and total page number
   //This should happen every time the page is change or 
   //TODO: that ^
   //Previous page arrow
   $('div.navigation img[alt~="Previous"]').click(function() {
      if (currentPage > 0)
         currentPage--;
      console.log("page: "+currentPage);
      $('#page_number').html((currentPage+1) + "/" + (Math.floor(orders.length/8+1)));
      updateCurrentWindow();
   });
   
   //Next page arrow
   $('div.navigation img[alt~="Next"]').click(function() {
      if(currentPage < Math.floor(orders.length)/8-1) {
      }
      $('#page_number').html((currentPage+1) + "/" + (Math.floor(orders.length/8+1)));
      updateCurrentWindow();
   });

   //Recall button
   $("#recall").click(function() {
      console.log("You clicked the recall button");
      //TODO: Bring up the most recently bumped order
      //i.e. Retrieve from the database, the order most recently bumped
   });

   //Bump button
   $('section.queue button').click(function(event) {
      console.log("Bump");
      $(event.target.parentNode).remove();
      //TODO
      //Order fill
      //Add the order to the bumped database (or whatever that is)
   });

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
   

   //UpdateCurrentWindow
   function updateCurrentWindow() {
      //TODO: Go through orders and add to the html
      $('div.window').empty();
      for(var i=currentPage*8; i<currentPage*8+8; i++) {
         pushOrderToWindow(i);
      }
   }

   function pushOrderToWindow(index) {
      //TODO: add the order object to the end of the window
      var orderElement = $('<section class="queue"><h1>Order</h1><ul></ul></section>');
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
   }



   // UPDATE ORDER WINDOW
   // Takes an array of JSON orders
   // Populates the order window with individual orders
   // Returns nothing
   /*
   function updateOrderWindow() {
      orderHTML = [];
      for(var i=0; i<orders.length; i++){
         orderHTML.push("");
         $.each(orders[i], function(key, val){
            if($.isArray(val)){
               for(var j=0; j<val.length; j++)
                  orderHTML[numOrders] += "<li>" + val[j] + "</li>";
            }
            else
               orderHTML[numOrders] += "<li>" + val + "</li>";
         })
         numOrders++;
         
      }

      maxPage = Math.floor(numOrders/10);
      changePage();
   }
<<<<<<< HEAD
   */

   //Change Page
   function changePage() {
      for (var i=0; i<10; i++){
         if (currentPage*10+i < numOrders)
            $('div section:nth-child('+i+') ul').html(orderHTML[currentPage*10+i]);
         else
            $('div section:nth-child('+i+') ul').html("");
      }
      $('#page_number').html((currentPage+1) + "/" + (maxPage+1));
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


   //loads in the availability json into html and checks available items
   function loadAvailChat(vClient){
      availTest=JSON.parse(vClient.responseText);
      //console.log(availTest);

      for(var k=0; k<availTest.length; k++){
         var category=availTest[k][0];
         $(".mainForm").append("<div class=\"avail\"></div>");
         var z=k+1;
         var currentItem=".mainForm div:nth-child("+z+")";

         $(currentItem).append("<h2>"+category+"</h2>");
         for(var j=1; j<availTest[k].length; j++){
            var allPurpose=availTest[k][j].name;
            $(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
            $(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"></br>");

            if(availTest[k][j].available){
               var z2=j*3;
               var evil="body > div > form > div:nth-child("+z+") > input:nth-child("+z2+")";
               $(evil).prop("checked", true);
            }
         }
      }
      //console.log(returnItem("Chipotle", availTest)); //testing
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


  
   var rootURL = "http://localhost:8888/lightwait/Web/api/index.php/menu";

   function getMenuData() {
      $.ajax({
         type: 'GET',
         url: rootURL,
         dataType: "json", // data type of response
         success: function(data){  
            $('#menuForm').append("<ul id=\"basesMenu\">");  
            for (var i=0; i<data['Bases'].length; i++){
               $('#menuForm').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i] + "\" value=\"" + data['Bases'][i] + "\"> <label for=\"" + data['Bases'][i] + "\">" + data['Bases'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"breadsMenu\">");
            for (var i=0; i<data['Breads'].length; i++){
               $('#menuForm').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i] + "\" value=\"" + data['Breads'][i] + "\"> <label for=\"" + data['Breads'][i] + "\">" + data['Breads'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"cheeseMenu\">");
            for (var i=0; i<data['Cheeses'].length; i++){
               $('#menuForm').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i] + "\" value=\"" + data['Cheeses'][i] + "\"> <label for=\"" + data['Cheeses'][i] + "\">" + data['Cheeses'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul><ul id=\"toppingsMenu\">");
            for (var i=0; i<data['Toppings'].length; i++){
               $('#menuForm').append("<li> <input type=\"checkbox\" name=\"toppingType\" id=\"" + data['Toppings'][i] + "\" value=\"" + data['Toppings'][i] + "\"> <label for=\"" + data['Toppings'][i] + "\">" + data['Toppings'][i] + "</label></li>");
            }
            $('#menuForm').append("</ul>");

         }
      });
   }

   getMenuData();



});
