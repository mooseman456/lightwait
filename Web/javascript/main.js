$(document).ready(function(){

   //Populate order information from JSON
   //This displays ten orders from the order queue in the chef queue window
   //TODO: 1st step, static (update when you refresh the pagae)

   //Set current and total page number
   //This should happen every time the page is change or 
   //TODO: that

   //Previous page arrow
   $('div.navigation img[alt~="Previous"]').click(function() {
      if (currentPage > 0)
         currentPage--;
      changePage();
   });
   
   //Next page arrow
   $('div.navigation img[alt~="Next"]').click(function() {
      console.log(Math.floor(numOrders/10));
      if(currentPage < maxPage) {
         currentPage++;
      }
      changePage();
   });

   function changePage() {
      for (var i=0; i<10; i++){
         if (currentPage*10+i < numOrders)
            $('div section:nth-child('+i+') ul').html(orderHTML[currentPage*10+i]);
         else
            $('div section:nth-child('+i+') ul').html("");

      }
      $('#page_number').html((currentPage+1) + "/" + (maxPage+1));
   }

   //Recall button
   $("#recall").click(function() {
      console.log("You clicked the recall button")
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


   var client = new XMLHttpRequest();     
   client.open('GET', '../Resources/SampleOrderData.json', true);
   client.send();
   var sampleOrder;
   var orderHTML;
   var chickNum=0;
   var beefNum=0;
   var beanNum=0;
   var doubleBeefNum=0;
   var turkeyNum=0;
   var numOrders=0;
   var currentPage=0;
   var maxPage=0;
   //waits for the names.csv to be successfully sent before running code
   client.onreadystatechange = function() {     
      if(client.readyState===4 && client.status===200){
         orderHTML = [];
         var doc=client.responseText;  //store text in doc
         sampleOrder=JSON.parse(doc);
         
         for(var i=0; i<sampleOrder.length; i++){
            switch(sampleOrder[i].Base){
               case "Chicken":
               chickNum++;
               break;
               case "Hamburger":
               beefNum++;
               break;
               case "Double Hamburger":
               doubleBeefNum++;
               break;
               case "Turkey":
               turkeyNum++;
               break;
               case "Black Bean":
               beanNum++;
               break;
            }
            orderHTML.push("");
            $.each(sampleOrder[i], function(key, val){
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
         
         // TODO:
         // Be able to dynamically create and keep track of base items
         // Right now they are hardcoded (i.e. chickNum, beefNum etc.)
         $("#hNum").html(beefNum);     
         $("#dhNum").html(doubleBeefNum);
         $("#cNum").html(chickNum);
         $("#tNum").html(turkeyNum);
         $("#bNum").html(beanNum);
      }


   };

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

   $( "#apiTestButton" ).click(function() {
      getAllOrders();
   });

   ////***availability.php Section***////
   var vClient = new XMLHttpRequest();     
   vClient.open('GET', '../Resources/sampleAvail.json', true);
   vClient.send();
   vClient.onreadystatechange = function() {     
      if(vClient.readyState===4 && vClient.status===200){
         loadAvailChat(vClient);
      }
   }
});

//loads in the availability json into html and checks available items
function loadAvailChat(vClient){
   availTest=JSON.parse(vClient.responseText);
   console.log(availTest);

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
   
}