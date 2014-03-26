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

   //Recall button
   $("#recall").click(function() {
      console.log("You clicked the recall button")
      //TODO: Bring up the most recently bumped order
      //i.e. Retrieve from the database, the order most recently bumped
   });

   //Bump button
   $('section.order button').click(function(event) {
      console.log("You clicked a bump button");
      //TODO
      //Visually remove that order from the queue
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

