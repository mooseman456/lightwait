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

   //Change availability
   $('a[href~="#"]').click(function(e) {
      e.preventDefault();
      console.log("You changed the availability of your mother");
      //TODO: Go to the change availability page
   });
});