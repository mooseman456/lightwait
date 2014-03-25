$(document).ready(function(){
   console.log("HELLO");

   $('div.navigation img[alt~="Previous"]').click(function() {
      console.log("You clicked the previous arrow");
   });
   
   $('div.navigation img[alt~="Next"]').click(function() {
      console.log("You clicked the next arrow");
   });

   $('section.order button').click(function() {
      console.log("You clicked a bump button");
   });

   $('a[href~="#"]').click(function(e) {
      e.preventDefault();
      console.log("You changed the availability of your mother");
   });
});