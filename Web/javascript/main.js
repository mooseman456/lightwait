$(document).ready(function(){
   console.log("HELLO");

   //Populate order information from JSON
   //This displays ten orders from the order queue in the chef queue window
   //TODO: 1st step, static (update when you refresh the pagae)

   //Set current and total page number
   //This should happen every time the page is change or 
   //TODO

   //Previous page arrow
   //TODO
   $('div.navigation img[alt~="Previous"]').click(function() {
      console.log("You clicked the previous arrow");
   });
   
   //Next page arrow
   //TODO
   $('div.navigation img[alt~="Next"]').click(function() {
      console.log("You clicked the next arrow");
   });

   //Recall button
   //TODO
   $("#recall").click(function() {
      console.log("You clicked the recall button")
   });

   //Bump button
   //TODO
   $('section.order button').click(function(event) {
      console.log("You clicked a bump button");
   });

   //Change availability
   //TODO
   $('a[href~="#"]').click(function(e) {
      e.preventDefault();
      console.log("You changed the availability of your mother");
   });
});