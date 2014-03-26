$(document).ready(function(){
   console.log("HELLO");

   //Populate order information from JSON
   //This displays ten orders from the order queue in the chef queue window
   //TODO: 1st step, static (update when you refresh the pagae)

   //Set current and total page number
   //This should happen every time the page is change or 
   //TODO: that

   //Previous page arrow
   $('div.navigation img[alt~="Previous"]').click(function() {
      console.log("You clicked the previous arrow");
      //TODO:
      //Nothing if you are on the first page
      //Display the previous ten order queue items in the window
   });
   
   //Next page arrow
   $('div.navigation img[alt~="Next"]').click(function() {
      console.log("You clicked the next arrow");
      //TODO:
      //Nothing if on the last page
      //Display the next ten order queue items in the window
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
});

var client = new XMLHttpRequest();     
client.open('GET', '../Resources/SampleOrderData.json', true);
client.send();
//waits for the names.csv to be successfully sent before running code
client.onreadystatechange = function() {     
   if(client.readyState===4 && client.status===200){
      var doc=client.responseText;  //store text in doc
      var sampleOrder=JSON.parse(doc);
      console.log(sampleOrder);
      var chickNum=0;
      var beefNum=0;
      var beanNum=0;
      var doubleBeefNum=0;
      var turkeyNum=0;
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
      }
      $("#hNum").html(beefNum);     
      $("#dhNum").html(doubleBeefNum);
      $("#cNum").html(chickNum);
      $("#tNum").html(turkeyNum);
      $("#bNum").html(beanNum);
      console.log("turkey="+turkeyNum+", Hamburger="+beefNum);
   }
};
